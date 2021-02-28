import React from "react";
import dateFns from "date-fns";
import ImgIcon from "./ImgIcon";
import Modal from "./Modal";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import StarRatingComponent from "react-star-rating-component";

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentMonth: dateFns.subMonths(new Date(), 2),
      selectedDate: new Date(),
      dataIsReturned: false,
      pair: {},
      show: false,
      selectedData: [],
      selectedNo: -1,
    };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.prevPost = this.prevPost.bind(this);
    this.nextPost = this.nextPost.bind(this);
  }
  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  nextPost = () => {
    console.log(this.state.selectedNo - 1);
    if (this.state.selectedNo - 1 >= 0) {
      this.setState({
        selectedDate: this.state.data[this.state.selectedNo - 1]
          .calendardatetime,
        selectedData: this.state.data[this.state.selectedNo - 1],
        selectedNo: this.state.selectedNo - 1,
      });
    }
  };
  prevPost = () => {
    if (this.state.selectedNo + 1 < this.state.data.length) {
      this.setState({
        selectedDate: this.state.data[this.state.selectedNo + 1]
          .calendardatetime,
        selectedData: this.state.data[this.state.selectedNo + 1],
        selectedNo: this.state.selectedNo + 1,
      });
    }
  };

  apiCall(url, body) {
    fetch(url, body)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        var Newpair = {};
        for (var i = 0; i < response.responseobjects[0].posts.length; i++) {
          if (!Newpair[response.responseobjects[0].posts[i].calendardatetime]) {
            Newpair[
              response.responseobjects[0].posts[i].calendardatetime.split(
                "T"
              )[0]
            ] = i;
          }
        }
        this.setState({
          data: response.responseobjects[0].posts,
          dataIsReturned: true,
          pair: Newpair,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  componentDidMount() {
    var token = { sorton: "calendardatetime", token: "28-02-2020" };
    this.apiCall("https://devapi.quinn.care/graph", this.funcBody(token));
  }

  funcBody(token) {
    var requestOptions;

    requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        requestobjects: [
          {
            posts: {
              operationtype: "read",
              id: {
                return: true,
              },
              userid: {
                searchvalues: ["41329663-5834-11eb-8e6e-3ca82abc3dd4"],
                return: true,
              },
              iscalendarentry: {
                searchvalues: ["true"],
                return: true,
              },
              media: {
                return: true, //contains image url
              },
              rating: {
                return: true,
              },
              text: {
                return: true,
              },
              privacy: {
                searchvalues: [18],
                return: true,
              },
              typeofday: {
                return: true,
              },

              // Don't change anything above ^^
              //editable variables start below //

              calendardatetime: {
                // Date Time of a particular post
                return: true, // please note: there can be multiple posts on a single day
                sort: "descending", // you can sort fetched dates by ascending/descending.
              },
              maxitemcount: "50", //you can ask between 1 to 50 posts (max) at a time.
              continuationtoken: null, //replace with the continuation token from response to get the next set
            },
          },
        ],
      }),
    };

    return requestOptions;
  }
  renderHeader() {
    const dateFormat = "MMMM YYYY";

    return (
      <div className="header row flex-middle">
        <div className="col col-start">
          <div className="icon" onClick={this.prevMonth}>
            chevron_left
          </div>
        </div>
        <div className="col col-center">
          <span>{dateFns.format(this.state.currentMonth, dateFormat)}</span>
        </div>
        <div className="col col-end" onClick={this.nextMonth}>
          <div className="icon">chevron_right</div>
        </div>
      </div>
    );
  }

  renderDays() {
    const dateFormat = "dddd";
    const days = [];

    let startDate = dateFns.startOfWeek(this.state.currentMonth);

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="col col-center" key={i}>
          {dateFns.format(dateFns.addDays(startDate, i), dateFormat)}
        </div>
      );
    }

    return <div className="days row">{days}</div>;
  }

  renderCells() {
    const { currentMonth, selectedDate } = this.state;
    const monthStart = dateFns.startOfMonth(currentMonth);
    const monthEnd = dateFns.endOfMonth(monthStart);
    const startDate = dateFns.startOfWeek(monthStart);
    const endDate = dateFns.endOfWeek(monthEnd);
    // console.log(startDate.getDate(), endDate)
    const dateFormat = "D";
    const rows = [];

    let days = [];
    let day = startDate;
    let formattedDate = "";

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = dateFns.format(day, dateFormat);
        const cloneDay = day;
        const cloneDay2 =this.state.pair[
          day.getFullYear() +
      "-" +
      dateFns.format(day, "MM")  +
      "-" +
      dateFns.format(day, "DD")
        ]
        // console.log(formattedDate);
        // console.log(
        //   day.getFullYear() +
        //   "-" +
        //   dateFns.format(day, "MM")  +
        //   "-" +
        //   dateFns.format(day, "DD")
        // );
        if (
          !(
            day.getFullYear() +
              "-" +
              dateFns.format(day, "MM")  +
              "-" +
              dateFns.format(day, "DD") in
            this.state.pair
          )
        ) {
          days.push(
            <div
              className={`col cell ${
                !dateFns.isSameMonth(day, monthStart)
                  ? "disabled"
                  : dateFns.isSameDay(day, selectedDate)
                  ? "selected"
                  : ""
              }`}
              key={day}
              onClick={() => this.onDateClick(dateFns.parse(cloneDay))}
            >
              <span className="number">{formattedDate}</span>
              <span className="bg">{formattedDate}</span>
            </div>
          );
          day = dateFns.addDays(day, 1);
        } else {
          console.log(cloneDay2);
          days.push(
            <ImgIcon
              onClick={() => this.onClickImg(cloneDay2)}
              data={
                this.state.data[this.state.pair[
                  day.getFullYear() +
              "-" +
              dateFns.format(day, "MM")  +
              "-" +
              dateFns.format(day, "DD")
                ]]
              }
            ></ImgIcon>
          );
          day = dateFns.addDays(day, 1);
        }
      }

      rows.push(
        <div className="row" key={day}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="body">{rows}</div>;
  }
  onClickImg = (no) => {
    this.setState({
      selectedDate: this.state.data[no].calendardatetime,
      selectedData: this.state.data[no],
      selectedNo: no,
    });
    this.showModal(no);
  };
  onDateClick = (day) => {
    this.setState({
      selectedDate: day,
    });
  };

  nextMonth = () => {
    this.setState({
      currentMonth: dateFns.addMonths(this.state.currentMonth, 1),
    });
  };

  prevMonth = () => {
    this.setState({
      currentMonth: dateFns.subMonths(this.state.currentMonth, 1),
    });
  };

  render() {
    if (this.state.dataIsReturned === true) {
      var months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      return (
        <div>
          {this.state.selectedData.length !== 0 ? (
            <Modal
              show={this.state.show}
              onClose={this.hideModal}
              onPrev={this.prevPost}
              onNext={this.nextPost}
            >
              <div className="container ">
                <div className="row rowHigh">
                  <div className="col-sm-12 rowHigh ">
                    <img
                      className="main-card-image"
                      src={this.state.selectedData.media[0].mediaurl}
                    />
                  </div>
                </div>

                <div className="row justify-content-left">
                  <div className="col-md-6 colDis">
                    {this.state.selectedData.typeofday.map((item) => {
                      if (item === "hair cut") {
                        return (
                          <div className="circleP">Cu</div>
                          // </div>
                        );
                      }
                      if (item === "protein treatment") {
                        return (
                          // <div className ={"col-md-"+6/this.state.selectedData.typeofday.length }>
                          <div className="circleG">Pr</div>
                          // </div>
                        );
                      }
                      if (item === "hair color") {
                        return (
                          // <div className ={"col-md-"+6/this.state.selectedData.typeofday.length }>
                          <div className="circleP">HC</div>
                          // </div>
                        );
                      }
                      if (item === "deep conditioning") {
                        return (
                          // <div className ={"col-md-"+6/this.state.selectedData.typeofday.length }>
                          <div className="circleG">DC</div>
                          // </div>
                        );
                      }
                      if (item === "clarifying") {
                        return (
                          // <div className ={"col-md-"+6/this.state.data.typeofday.length }>
                          <div className="circleP">Pr</div>
                          // </div>
                        );
                      }
                    })}
                  </div>
                  <div className="col-md-6  nopadding">
                    <StarRatingComponent
                      className="rating"
                      editing={false}
                      name="rate1"
                      starCount={5}
                      value={this.state.selectedData.rating}
                    />
                  </div>
                </div>

                <div className="row justify-content-center">
                  <div className="col-md-12">
                    {this.state.selectedData.calendardatetime
                      .split("-")[2]
                      .split("T")[0] + " "}
                    {" " +
                      months[
                        this.state.selectedData.calendardatetime.split("-")[1]
                      -1]}
                  </div>
                </div>
                <p></p>
                <div className="row justify-content-center">
                  <div className="col-md-12">
                    {this.state.selectedData.text}
                  </div>
                </div>
              </div>
            </Modal>
          ) : (
            <div />
          )}
          <div className="calendar">
            {this.renderHeader()}
            {this.renderDays()}
            {this.renderCells()}
          </div>
        </div>
      );
    }
    // else if(!(this.state.selectedData.length === 0)){
    //   return(
    //   <div className="calendar">
    //   {this.renderHeader()}
    //   {this.renderDays()}
    //   {this.renderCells()}
    // </div>)
    // }
    else {
      return (
        <div className="calendar">
          <h1> Loading </h1>
        </div>
      );
    }
  }
}

export default Calendar;
