import React, { useEffect, useState, useReducer } from "react";
import "./App.css";
import Display from "./display";

//useRef,generic functions

interface ILocationTypes {
  pincode: number;
  city: string;
}

export interface IlistItems {
  flight_number: number;
  mission_name: string;
  details: string;
  rocket: {
    rocket_id: string;
  };
  // location:{
  //   pincode:number,
  //   city:string
  // }[]
  location: Array<ILocationTypes>;
}
export interface events {
  target: {
    value: string | number;
  };
}
function App() {
  type IList = {
    flight_number: number;
    mission_name: string;
    details: string;
    rocket: {
      rocket_id: string;
    };
    location: {
      pincode: number;
      city: string;
    }[];
  }[];

  interface Istates {
    clickedDetail: string;
  }

  type Iactions = { type: "clicked"; index: number };

  const reducer: React.Reducer<Istates, Iactions> = (state, action) => {
    switch (action.type) {
      case "clicked":
        var x: string = list
          ? list[action.index]
            ? list[action.index].details
              ? list[action.index].details
              : "No details available"
            : "No details available"
          : "No details available";
        return { clickedDetail: x };
      default:
        return { clickedDetail: "" };
    }
  };

  const iniital = { clickedDetail: "", id: 0 };

  const [list, setList] = useState<IList>([
    {
      flight_number: 0,
      mission_name: "",
      details: "",
      rocket: {
        rocket_id: ""
      },
      location: [{ pincode: 0, city: "" }]
    }
  ]); //assign a iniital value
  const [inputValue, setInputValue] = useState<string | number>("");
  const [state, dispatch] = useReducer<React.Reducer<Istates, Iactions>>(
    reducer,
    iniital
  );

  useEffect(() => {
    fetchList();
  }, []);

  const customRender = ():JSX.Element => {
    return <p>it's a dom</p>;
  };

  const fetchList = () => {
    //fn return type
    return fetch("https://api.spacexdata.com/v3/launches?limit=20&offset=0")
      .then(res => res.json())
      .then(val => {
        setList(val);
      })
      .catch(err => console.error("err", err));
  };

  const handleChange = (e: events): void => {
    setInputValue(e.target.value);
  };

  return (
    <div className="App">
      <ul className="list">
        {list.map((item: IlistItems, id: number) => {
          //,sadfsa,asdfsdf,lasldfl,sdfasdf,sasdfdsf -- using intersection
          return (
            <li onClick={() => dispatch({ type: "clicked", index: id })}>
              <p>{item.flight_number}</p> <p>{item.mission_name}</p>{" "}
              <p>rocket id: {item.rocket.rocket_id}</p>
            </li>
          );
        })}
      </ul>

      <p>{inputValue}</p>
      <Display
        clickedDetail={
          state.clickedDetail !== undefined ? state.clickedDetail : ""
        }
        inputValue={inputValue}
        handleChange={handleChange}
        customRender={customRender}
        //customRender
      />
    </div>
  );
}

export default App;
