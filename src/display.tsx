import React from "react";
import { IlistItems, Props} from "./App";



function Display({ clickedDetail, inputValue, handleChange, customRender }: Props) {
  //get a function
  var items: IlistItems = {
    flight_number: 5,
    mission_name: "h",
    details: "kj",
    rocket: {
      rocket_id: "jk"
    },
    location: [
      {
        pincode: 7845,
        city: "djhgf",
        label:"label"
      }
    ]
  };
  return (
    <div>
      {customRender()}
      <p>{items.location[0].label}</p>
      <input onChange={handleChange} value={inputValue} />
      <div className="display">{clickedDetail}</div>
    </div>
  );
}
export default Display;
