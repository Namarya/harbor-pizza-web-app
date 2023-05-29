import React from "react";

export default function Footer() {
  return (
    <div>
      <div className=" bg-dark w-100 text-center p-2">
        <p className=" m-0 p-0" style={{ fontSize: ".7rem", color: "#b1b1b1" }}>
          This Site Was Designed And Developed By{" "}
          <a
            style={{ textDecoration: "none", color: "#fff" }}
            className="link"
            target="_blank"
            href="https://github.com/Namarya/harbor-pizza-web-app"
            rel="noreferrer"
          >
            Arya Namiranian
          </a>
        </p>
      </div>
    </div>
  );
}
