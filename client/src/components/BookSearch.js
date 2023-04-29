import { useState } from "react";
import axios from "axios";


export default function BookSearch({ onQuery }) {
  const [book, setBook] = useState("");
  console.log(book)
  const handleFormSubmit = async (book) => {
    setBook(book);
    const options = {
      headers: { "X-Api-Key": "AIzaSyCS6tdjuxQyushdOyM3QaU36HOHVybL_PI" },
    };

    try {
      const response =   await axios.get(
        `GET https://www.googleapis.com/books/v1/volumes?q=flowers+inauthor:keyes&key=${options}`,
        options
      );
      const { data } = await response;

      formatValueText({ onQuery }, data);
    } catch (error) {
      console.error(error);
    }

  };
  return (
    <>
      <p id="muscle-section-title">genres</p>
      <div className="dropDownBtns">
        <button onClick={() => handleFormSubmit("abdominals")}
          value="abdominals">Abdominals</button>


        <button onClick={() => handleFormSubmit("abductors")}
          value="abductors">Abductors</button>


        <button onClick={() => handleFormSubmit("adductors")}>Adductors</button>


        <button onClick={() => handleFormSubmit("biceps")}>Biceps</button>


        <button onClick={() => handleFormSubmit("calves")}>Calves</button>


        <button onClick={() => handleFormSubmit("chest")}>Chest</button>


        <button onClick={() => handleFormSubmit("forearms")}>Forearms</button>


        <button onClick={() => handleFormSubmit("glutes")}>Glutes</button>


        <button onClick={() => handleFormSubmit("hamstrings")}>Hamstrings</button>


        <button onClick={() => handleFormSubmit("lats")}>Lats</button>


        <button onClick={() => handleFormSubmit("lower_back")}>Lower Back</button>


        <button onClick={() => handleFormSubmit("middle_back")}>Middle Back</button>


        <button onClick={() => handleFormSubmit("neck")}>Neck</button>


        <button onClick={() => handleFormSubmit("quadriceps")}>Quadriceps</button>


        <button onClick={() => handleFormSubmit("traps")}>Traps</button>


        <button onClick={() => handleFormSubmit("triceps")}>Triceps</button>
      </div>
    </>
  );
}


// this function is used to clean up the values in the exercise objects
const formatValueText = ({ onQuery }, data) => {
  for (var i = 0; i < 10; i++) {
    var rawType = data[i].type;
    var editType = rawType.replace(/_/g, ' ');
    data[i].type = editType;

    var rawMuscle = data[i].muscle;
    var editMuscle = rawMuscle.replace(/_/g, ' ');
    data[i].muscle = editMuscle;

    var rawEquipment = data[i].equipment;
    var editEquipment = rawEquipment.replace(/_/g, ' ');
    data[i].equipment = editEquipment;
  }
  onQuery(data);
};