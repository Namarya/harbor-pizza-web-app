import React from "react";

export default function StoreInfo() {
  return (
    <div className="business-hours">
      <div className="bg-white p-3 rounded" style={{}}>
        <div>
          <div className="d-flex justify-content-center align-items-center">
            <i className="fa-regular fa-clock me-1"></i>
            <span className="black">
              {" "}
              <b>Business Hours</b>
            </span>
          </div>
          <div className="hours mt-3">
            <p
              style={{ backgroundColor: "rgba(150,150,150,.2)" }}
              className="mt-1 mb-1 p-2 rounded d-flex justify-content-between"
            >
              <span className="day">Sunday</span>{" "}
              <span className="time">1:30PM - 9:30PM</span>
            </p>
            <p
              style={{ backgroundColor: "rgba(150,150,150,.2)" }}
              className="mt-1 mb-1 p-2 rounded d-flex justify-content-between"
            >
              <span className="day">Monday</span>{" "}
              <span className="time">1:00PM - 9:30PM</span>
            </p>
            <p
              style={{ backgroundColor: "rgba(150,150,150,.2)" }}
              className="mt-1 mb-1 p-2 rounded d-flex justify-content-between"
            >
              <span className="day">Tuesday</span>{" "}
              <span className="time">CLOSED</span>
            </p>
            <p
              style={{ backgroundColor: "rgba(150,150,150,.2)" }}
              className="mt-1 mb-1 p-2 rounded d-flex justify-content-between"
            >
              <span className="day">Wednesday</span>{" "}
              <span className="time">1:00PM - 9:30PM</span>
            </p>
            <p
              style={{ backgroundColor: "rgba(150,150,150,.2)" }}
              className="mt-1 mb-1 p-2 rounded d-flex justify-content-between"
            >
              <span className="day">Thursday</span>{" "}
              <span className="time">1:00PM - 9:30PM</span>
            </p>
            <p
              style={{ backgroundColor: "rgba(150,150,150,.2)" }}
              className="mt-1 mb-1 p-2 rounded d-flex justify-content-between"
            >
              <span className="day">Friday</span>{" "}
              <span className="time">1:00PM - 9:30PM</span>
            </p>
            <p
              style={{ backgroundColor: "rgba(150,150,150,.2)" }}
              className="mt-1 mb-1 p-2 rounded d-flex justify-content-between"
              id="sat"
            >
              <span className="day">Saturday</span>{" "}
              <span className="time">1:00PM - 9:30PM</span>
            </p>
          </div>
        </div>

        <hr />

        <div className="d-flex justify-content-center align-items-center">
          <a
            href="tel:+17145540084"
            className="d-flex align-items-center text-decoration-none  text-dark"
          >
            <i className="fa-solid fa-phone me-1"></i>
            (714) 554 - 0084
          </a>
        </div>

        <hr />
        <address>
          <a
            target="_blank"
            href="https://goo.gl/maps/HycNaGUqJFVfSijf9"
            rel="noreferrer"
            className="d-flex align-items-center text-decoration-none  text-dark"
          >
            <i className="fa-solid fa-location-dot me-1"></i>
            13917 Harbor Blvd, Garden Grove, CA 92843
          </a>
        </address>
      </div>
    </div>
  );
}
