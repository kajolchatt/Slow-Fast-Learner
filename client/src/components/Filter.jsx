import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Axios from "axios";

function Filter() {
  const [form, setForm] = useState({
    batch: "",
    semester: "",
    section: "",
  });

  const batchOptions = [2021, 2022, 2023, 2024];

  const semesterOptions = [1, 2, 3, 4, 5, 6, 7, 8];

  const sectionOptions = ["A", "B", "C", "D"];

  const handleOnChange = (key, value) => {
    setForm((currentValue) => {
      return {
        ...currentValue,
        [key]: value
      }
    })
  }

  const handleSubmit = () => {
    console.log(form);

    const bodyData = {...form};

    //api call here
  }

  const disableSubmit = Object.values(form).some(v => !v);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "darkcyan",
        padding: 20,
        gap: 20,
      }}
    >
      <div style={{ display: "flex", gap: 20 }}>
        <label htmlFor="batch" style={{ minWidth: 100 }}>
          Batch
        </label>
        <select
          name="batch"
          value={form.batch}
          onChange={(e) => {
            handleOnChange('batch', e.target.value);
          }}
        >
          <option value='' disabled>Select your option</option>
          {batchOptions.map((option) => {
            return (
              <option key={"batch" + option} value={option}>
                {option}
              </option>
            );
          })}
        </select>
      </div>
      {
        form.batch
        &&
        (

          <div style={{ display: "flex", gap: 20 }}>
            <label htmlFor="semester" style={{ minWidth: 100 }}>
              Semester
            </label>
            <select
              name="semester"
              value={form.semester}
              onChange={(e) => {
                handleOnChange('semester', e.target.value);
              }}
            >
              <option value='' disabled>Select your option</option>
              {semesterOptions.map((option) => {
                return (
                  <option key={"semester" + option} value={option}>
                    {option}
                  </option>
                );
              })}
            </select>
          </div>
        )
      }
      {
        form.semester
        &&
        (

          <div style={{ display: "flex", gap: 20 }}>
            <label htmlFor="section" style={{ minWidth: 100 }}>
              Section
            </label>
            <select
              name="section"
              value={form.section}
              onChange={(e) => {
                handleOnChange('section', e.target.value);
              }}
            >
              <option value='' disabled>Select your option</option>
              {sectionOptions.map((option) => {
                return (
                  <option key={"section" + option} value={option}>
                    {option}
                  </option>
                );
              })}
            </select>
          </div>
        )
      }
      <div>
        <button disabled={disableSubmit} onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
}

export default Filter;
