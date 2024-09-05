import React, { useEffect, useState } from "react"
import img1 from "../assets/pngtree-user-vector-avatar-png-image_1541962.jpg"
import axios from "axios"
import {
  validateAnesthesia,
  validateAnesthesiologist,
  validateDate,
  validateDoctor,
  validatePatientType,
  validateProcedure,
  validateSurgeon,
} from "../utils/Validate"

const Details = () => {
  const [patientType, setPatientType] = useState("")

  const [date, setDate] = useState("")
  const [dateError, setDateError] = useState("")
  const [time, setTime] = useState("")
  const [minutes, setMinutes] = useState("")
  const [selectProcedure, setSelectProcedure] = useState("")
  const [procedures, setProcedures] = useState([])
  const [surgeon, setSurgeon] = useState([])
  const [selectedSurgeon, setSelectedSurgeon] = useState()
  const [anesthesiaTypes, setAnesthesiaTypes] = useState([])
  const [selectAnesthesiaTypes, setSelectAnesthesiaTypes] = useState()
  const [anesthesiologists, setAnesthesiologists] = useState([])
  const [selectAnesthesiologists, setSelectAnesthesiologists] = useState()
  const [doctors, setDoctors] = useState([])
  const [selectDoctor, setSelectDoctor] = useState()
  const [details, setDetails] = useState("")
  const [data, setData] = useState([])
  const [error, setError] = useState(null)
  const [procedureError, setProcedureError] = useState("")
  const [surgeonError, setSurgeonError] = useState("")
  const [anesthesiaTypeError, setAnesthesiaTypeError] = useState("")
  const [anesthesiologistsError, setAnesthesiologistsError] = useState("")
  const [doctorError, setDoctorError] = useState("")
  const [patientTypeError, setPatientTypeError] = useState("")

  const baseURL = "https://a20a9b61-d74b-427f-b0d3-4a56ee5ca8bf.mock.pstmn.io"

  const userData = async () => {
    try {
      const response = await axios.get(
        "https://da6a384d-6c18-4a20-a9cf-bada613116a1.mock.pstmn.io/GET DETAILS BY UHID",
        {
          params: {
            userName: "BEENA",
            uhid: "7456",
          },
        }
      )

      setData(response.data.response)
    } catch (err) {
      setError(err.message)
    }
  }

  const fetchAllProcedure = async () => {
    try {
      const response = await axios.get(`${baseURL}/GET ALL PROCEDURES`, {
        params: {
          page: 0,
          size: 50,
        },
      })
      setProcedures(response.data.response.content)
    } catch (err) {
      setError(err.message)
    }
  }
  const fetchAllAnesthesiaType = async () => {
    try {
      const response = await axios.get(`${baseURL}/GET ALL ANASTHESIA TYPE`, {
        params: {
          page: 0,
          size: 10,
        },
      })
      setAnesthesiaTypes(response.data.response.content)
    } catch (err) {
      setError(err.message)
    }
  }
  const fetchAllSurgeon = async () => {
    try {
      const response = await axios.get(`${baseURL}/GET ALL SURGEON`, {
        params: {
          page: 0,
          size: 100,
        },
      })
      setSurgeon(response.data.response.content)
    } catch (err) {
      setError(err.message)
    }
  }
  const fetchAllAnasthesiologist = async () => {
    try {
      const response = await axios.get(`${baseURL}/GET ALL ANASTHESIOLOGIST`, {
        params: {
          page: 0,
          size: 100,
        },
      })
      setAnesthesiologists(response.data.response.content)
    } catch (err) {
      setError(err.message)
    }
  }

  useEffect(() => {
    userData()
    fetchAllProcedure()
    fetchAllAnesthesiaType()
    fetchAllSurgeon()
    fetchAllAnasthesiologist()
  }, [baseURL])
  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      const newForm = new FormData()
      newForm.append("procedureId", selectProcedure)
      newForm.append("anesthesiaTypeId", selectAnesthesiaTypes)
      newForm.append("surgeonId", selectedSurgeon)
      newForm.append("nesthesiologistId", selectAnesthesiologists)
      newForm.append("surgeryDetails", details)
      newForm.append("planningEncTypeId", patientType)
      newForm.append("requestedDoctorId", selectDoctor)
      setPatientTypeError(validatePatientType(patientType))
    } catch (error) {}
  }

  return error ? (
    <div className="grid place-content-center min-h-[80vh]">
  <div className="flex  items-center">
        <div className="w-16 h-16 place-self-center border-4 border-red-400  rounded-full relative" >
          <p className="absolute text-4xl flex items-center  px-5 py-2">!</p>
  </div>
      <p className="font-[500] text-3xl text-red-400 ml-4">{error}</p>
    </div>
    <p className="text-4xl mt-8">Please wait a moment and reload</p>
    <div className="w-56 flex justify-center mt-4">
      <button
        onClick={() => window.location.reload()} // Reload the browser when clicked
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Reload Page
      </button>
    </div>
  </div>


  ) : (
    <>
      <form onSubmit={handleSubmit}>
        <div className="w-full flex flex-col lg:flex-row">
          {/* user details */}
          <div className="flex flex-col lg:flex-row justify-start gap-5 lg:gap-20 w-full lg:w-[50%] h-auto lg:h-52 p-4 m-auto shadow-lg rounded-md mt-3 border mb-10">
            <div className="flex justify-center lg:justify-start">
              <img src={img1} alt="" className="w-24 lg:w-36" />
            </div>
            <div className="flex flex-col lg:flex-row gap-3 lg:gap-5 mt-5 lg:mt-0">
              <div className="flex flex-col gap-3 lg:gap-5">
                <p className="font-bold">NAME:</p>
                <p className="font-bold">UHID:</p>
                <p className="font-bold">DOB/AGE:</p>
                <p className="font-bold">GENDER:</p>
              </div>
              <div className="flex flex-col gap-3 lg:gap-5">
                <p>{data.name}</p>
                <p>{data.uhid}</p>
                <p>{data.dob}</p>
                <p>{data.gender}</p>
              </div>
            </div>
          </div>

          {/* time */}
          <div className="flex justify-between w-full lg:w-[50%] h-auto lg:h-52 p-4 m-auto shadow-lg rounded-md mt-3 border ml-0 lg:ml-4 mr-0 lg:mr-4">
            <div className="flex flex-col lg:flex-row justify-center lg:justify-start gap-5 lg:gap-10">
              <div>
                <p className="opacity-75">
                  Planned Date <span className="text-red-700 font-bold">*</span>
                </p>
                <div className="border rounded-md font-bold p-2 lg:p-3 h-24 flex  flex-col justify-center items-center">
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => {
                      setDate(e.target.value)

                      setDateError(validateDate(e.target.value))
                    }}
                    className="w-full"
                  />
                  <div className="text-red-600">
                    <p>{dateError}</p>
                  </div>
                </div>
              </div>
              <div>
                <p className="opacity-75">
                  Planned Time <span className="text-red-700 font-bold">*</span>
                </p>
                <div className="border rounded-md font-bold p-2 lg:p-3 h-24 flex items-center">
                  <input
                    type="time"
                    value={time}
                    onChange={(e) => {
                      setTime(e.target.value)
                    }}
                    className="w-full"
                  />
                </div>
              </div>
              <div>
                <p className="opacity-75">
                  Duration (Minutes){" "}
                  <span className="text-red-700 font-bold">*</span>
                </p>
                <div className="border rounded-md font-bold p-2 lg:p-3 h-24 flex items-center">
                  <input
                    type="number"
                    value={minutes}
                    onChange={(e) => setMinutes(e.target.value)}
                    min="0"
                    max="1440"
                    className="w-full"
                    placeholder="Minutes"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* surgery details */}
        <div className="w-full flex flex-col lg:flex-row">
          <div className="flex flex-col gap-10 w-full lg:w-[47%] h-auto lg:h-[450px] p-4 m-auto shadow-md rounded-md mt-3 border mb-12 lg:mr-4">
            <div className="flex flex-col w-full">
              <div>
                <p className="font-bold text-gray-500 opacity-60">
                  Procedure <span className="text-red-700">*</span>
                </p>
              </div>

              <div className="w-full flex justify-center border-2 h-12 rounded-md">
                <select
                  value={selectProcedure}
                  onChange={(e) => {
                    setSelectProcedure(e.target.value)
                    setProcedureError(validateProcedure(e.target.value))
                  }}
                  className="w-full"
                  name=""
                  id=""
                >
                  <option value="none">Select procedure</option>
                  {procedures &&
                    procedures.map((item, index) => (
                      <option value={item.id} key={index}>
                        {item.text}
                      </option>
                    ))}
                </select>
              </div>
              <p className="text-red-600">{procedureError}</p>
            </div>
            <div className="flex flex-col w-full">
              <div>
                <p className="font-bold text-gray-500 opacity-60">
                  Surgeon <span className="text-red-700">*</span>
                </p>
              </div>
              <div className="w-full flex justify-center border-2 h-12 rounded-md">
                <select
                  value={selectedSurgeon}
                  onChange={(e) => {
                    setSelectedSurgeon(e.target.value)
                    setSurgeonError(validateSurgeon(e.target.value))
                  }}
                  className="w-full"
                  name=""
                  id=""
                >
                  <option value="none">Select Surgeon</option>
                  {surgeon &&
                    surgeon.map((item, index) => (
                      <option value={item.id} key={index}>
                        {item.text}
                      </option>
                    ))}
                </select>
              </div>
              <p className="text-red-600">{surgeonError}</p>
            </div>
            <div className="flex flex-col w-full">
              <div>
                <p className="font-bold text-gray-500 opacity-60">
                  Anesthesia Type <span className="text-red-700">*</span>
                </p>
              </div>
              <div className="w-full flex justify-center border-2 h-12 rounded-md">
                <select
                  value={selectAnesthesiaTypes}
                  onChange={(e) => {
                    setSelectAnesthesiaTypes(e.target.value)
                    setAnesthesiaTypeError(validateAnesthesia(e.target.value))
                  }}
                  className="w-full"
                  name=""
                  id=""
                >
                  <option value="none">Select Anesthesia Type</option>
                  {anesthesiaTypes &&
                    anesthesiaTypes.map((item, index) => (
                      <option value={item.id} key={index}>
                        {item.text}
                      </option>
                    ))}
                </select>
              </div>
              <p className="text-red-600">{anesthesiaTypeError}</p>
            </div>
            <div className="flex flex-col w-full">
              <div>
                <p className="font-bold text-gray-500 opacity-60">
                  Anesthesiologist <span className="text-red-700">*</span>
                </p>
              </div>
              <div className="w-full flex justify-center border-2 h-12 rounded-md">
                <select
                  value={selectAnesthesiologists}
                  onChange={(e) => {
                    setSelectAnesthesiologists(e.target.value)
                    setAnesthesiologistsError(
                      validateAnesthesiologist(e.target.value)
                    )
                  }}
                  className="w-full"
                  name=""
                  id=""
                >
                  <option value="none">Select Anesthesiologist</option>
                  {anesthesiologists &&
                    anesthesiologists.map((item, index) => (
                      <option value={item.id} key={index}>
                        {item.text}
                      </option>
                    ))}
                </select>
              </div>
              <p className="text-red-600">{anesthesiologistsError}</p>
            </div>
          </div>

          {/* plan to perform on */}
          <div className="flex flex-col justify-between w-full lg:w-[45%] h-auto lg:h-[450px] p-4 m-auto shadow-md rounded-md mt-3 border ml-0 lg:ml-5 mb-12 lg:mr-[90px]">
            <div className="flex flex-col w-full">
              <p>
                Planned to perform on <span className="text-red-700">*</span>
              </p>

              <div className="flex gap-5 mt-4">
                <div className="mb-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="patientType"
                      value="outpatient"
                      checked={patientType === "outpatient"}
                      onChange={(e) => setPatientType(e.target.value)}
                      className="form-radio h-4 w-4 text-black focus:ring-black"
                    />
                    <span className="ml-2 text-gray-700 font-bold">
                      Outpatient
                    </span>
                  </label>
                </div>

                <div className="mb-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="patientType"
                      value="inpatient"
                      checked={patientType === "inpatient"}
                      onChange={(e) => setPatientType(e.target.value)}
                      className="form-radio h-4 w-4 text-black focus:ring-black"
                    />
                    <span className="ml-2 text-gray-700 font-bold">
                      Inpatient
                    </span>
                  </label>
                </div>
              </div>
              {patientTypeError && (
                <p className="text-red-600">{patientTypeError}</p>
              )}

              <div className="mb-4">
                <label className="block text-gray-700 mb-2 font-bold opacity-75">
                  Details
                </label>
                <textarea
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  className="form-textarea mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                  rows="4"
                  placeholder="Enter details about the surgery..."
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2 font-bold opacity-75">
                  Requesting Doctor <span className="text-red-700">*</span>
                </label>
                <select
                  value={selectDoctor}
                  onChange={(e) => {
                    setSelectDoctor(e.target.value)
                    setDoctorError(validateDoctor(e.target.value))
                  }}
                  className="form-select mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-gray-500 focus:ring-gray-500"
                >
                  <option value="none">Select Request Doctor</option>
                  {doctors &&
                    doctors.map((item, index) => (
                      <option value={item.id} key={index}>
                        {item.name}
                      </option>
                    ))}
                </select>
              </div>
              <p className="text-red-600">{doctorError}</p>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-12 m-auto">
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            SAVE & CONTINUE
          </button>
        </div>
      </form>
    </>
  )
}

export default Details
