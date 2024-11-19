import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import Input from "../common/Input";
import Header from "../common/Header";
import MyEditor from "../common/CKEditor";
import { useTheme } from "../../context/ThemeProvider";

const UserForm = ({ singleData, onSave, id }) => {
  const { theme } = useTheme();

  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [fatherHusbandName, setFatherHusbandName] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [spouseName, setSpouseName] = useState("");
  const [village, setVillage] = useState("");
  const [street, setStreet] = useState("");
  const [townCity, setTownCity] = useState("");
  const [postOffice, setPostOffice] = useState("");
  const [policeStation, setPoliceStation] = useState("");
  const [district, setDistrict] = useState("");
  const [state, setState] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [houseNo, setHouseNo] = useState("");
  const [alternatePhone, setAlternatePhone] = useState("");
  const [madhyamik, setMadhyamik] = useState("");
  const [hs, setHs] = useState("");
  const [graduation, setGraduation] = useState("");
  const [postGraduation, setPostGraduation] = useState("");
  const [others, setOthers] = useState("");
  const [nomineeName, setNomineeName] = useState("");
  const [nomineeAge, setNomineeAge] = useState("");
  const [nomineeRelation, setNomineeRelation] = useState("");
  const [bankName, setBankName] = useState("");
  const [accountNo, setAccountNo] = useState("");
  const [ifscCode, setIfscCode] = useState("");
  const [pan, setPan] = useState("");
  const [workExperience, setWorkExperience] = useState("");

  useEffect(() => {
    if (singleData) {
      setFullName(singleData?.full_name || "");
      setFatherHusbandName(singleData?.fatherOrHusbandName || "");
      setGender(singleData?.gender || "");
      setDob(singleData?.dob || "");
      setAge(singleData?.age || "");
      setEmail(singleData?.email || "");
      setMobile(singleData?.phone_number || "");
      setSpouseName(singleData?.spouseName || "");
      setVillage(singleData?.permanentAddress?.village || "");
      setStreet(singleData?.permanentAddress?.streetLaneRoad || "");
      setTownCity(singleData?.permanentAddress?.townCity || "");
      setPostOffice(singleData?.permanentAddress?.postOffice || "");
      setPoliceStation(singleData?.permanentAddress?.policeStation || "");
      setDistrict(singleData?.permanentAddress?.district || "");
      setState(singleData?.permanentAddress?.state || "");
      setPinCode(singleData?.permanentAddress?.pin || "");
      setHouseNo(singleData?.permanentAddress?.houseNo || "");
      setAlternatePhone(singleData?.permanentAddress?.altPhone || "");
      setMadhyamik(singleData?.educationalQualifications?.madhyamik || "");
      setHs(singleData?.educationalQualifications?.hs || "");
      setGraduation(singleData?.educationalQualifications?.graduation || "");
      setPostGraduation(
        singleData?.educationalQualifications?.postGraduation || ""
      );
      setOthers(singleData?.educationalQualifications?.others || "");
      setNomineeName(singleData?.nominee?.nomineeName || "");
      setNomineeAge(singleData?.nominee?.nomineeAge || "");
      setNomineeRelation(singleData?.nominee?.nomineeRelation || "");
      setBankName(singleData?.bankDetails?.bankName || "");
      setAccountNo(singleData?.bankDetails?.accountNo || "");
      setIfscCode(singleData?.bankDetails?.ifscCode || "");
      setPan(singleData?.panCardNo || "");
      setWorkExperience(singleData?.workExperienceDetail || "");
    }
  }, [singleData]);

  const payload = {
    id,
    full_name: fullName,
    fatherOrHusbandName: fatherHusbandName,
    gender,
    dob,
    age,
    email,
    phone_number: mobile,
    spouseName,
    permanentAddress: {
      village,
      streetLaneRoad: street,
      townCity,
      postOffice,
      policeStation,
      district,
      state,
      pin: pinCode,
      houseNo,
      altPhone: alternatePhone,
    },
    educationalQualifications: {
      madhyamik,
      hs,
      graduation,
      postGraduation,
      others,
    },
    nominee: {
      nomineeName,
      nomineeAge,
      nomineeRelation,
    },
    bankDetails: {
      bankName,
      accountNo,
      ifscCode,
    },
    panCardNo: pan,
    workExperienceDetail: workExperience,
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      await onSave(payload);

      if (id) {
        toast.success("User updated successfully.");
      } else {
        toast.success("User created successfully.");
      }
      navigate("/users");
    } catch (error) {
      toast.error("Failed to save user. Please try again.");
    }
  };

  return (
    <motion.form
      className={`${
        theme === "dark"
          ? "bg-gray-800 text-gray-100"
          : "bg-gray-100 text-gray-900"
      } bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border ${
        theme === "dark" ? "border-gray-700" : "border-gray-300"
      } mb-8`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      onSubmit={handleSubmit}
    >
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <Input
              fieldName="Full Name"
              fieldType="text"
              placeHolder="Full Name"
              setValue={setFullName}
              fieldValue={fullName}
            />

            <Input
              fieldName=" Father/Husband Name"
              fieldType="text"
              placeHolder=" Father/Husband Name"
              setValue={setFatherHusbandName}
              fieldValue={fatherHusbandName}
            />

            <Input
              fieldName="Gender"
              fieldType="text"
              placeHolder="Gender"
              setValue={setGender}
              fieldValue={gender}
            />

            <Input
              fieldName="DOB"
              fieldType="date"
              placeHolder="DOB"
              setValue={setDob}
              fieldValue={dob}
            />

            <Input
              fieldName="Age"
              fieldType="number"
              placeHolder="Age"
              setValue={setAge}
              fieldValue={age}
            />

            <Input
              fieldName="Email"
              fieldType="email"
              placeHolder="email"
              setValue={setEmail}
              fieldValue={email}
            />

            <Input
              fieldName="Mobile"
              fieldType="number"
              placeHolder="Mobile"
              setValue={setMobile}
              fieldValue={mobile}
            />

            <Input
              fieldName="Spouse Name"
              fieldType="text"
              placeHolder="Spouse Name"
              setValue={setSpouseName}
              fieldValue={spouseName}
            />

            <h1
              style={{
                color: "white",
                fontWeight: "bold",
                backgroundColor: "blue",
                width: "100%",
              }}
            >
              Permanent Address
            </h1>

            <Input
              fieldName="Village"
              fieldType="text"
              placeHolder="village"
              setValue={setVillage}
              fieldValue={village}
            />

            <Input
              fieldName="Street/Lane/Road"
              fieldType="text"
              placeHolder="Street/Lane/Road"
              setValue={setStreet}
              fieldValue={street}
            />

            <Input
              fieldName="Town/City"
              fieldType="text"
              placeHolder="Town/City"
              setValue={setTownCity}
              fieldValue={townCity}
            />

            <Input
              fieldName="Post Office"
              fieldType="text"
              placeHolder="post Office"
              setValue={setPostOffice}
              fieldValue={postOffice}
            />

            <Input
              fieldName="Police Station"
              fieldType="text"
              placeHolder="Police Station"
              setValue={setPoliceStation}
              fieldValue={policeStation}
            />

            <Input
              fieldName="District"
              fieldType="text"
              placeHolder="District"
              setValue={setDistrict}
              fieldValue={district}
            />

            <Input
              fieldName="State"
              fieldType="text"
              placeHolder="State"
              setValue={setState}
              fieldValue={state}
            />

            <Input
              fieldName="Pin Code"
              fieldType="number"
              placeHolder="pin code"
              setValue={setPinCode}
              fieldValue={pinCode}
            />

            <Input
              fieldName="House No"
              fieldType="text"
              placeHolder="House No"
              setValue={setHouseNo}
              fieldValue={houseNo}
            />

            <Input
              fieldName="Alternate Phone"
              fieldType="number"
              placeHolder="Alternate Phone"
              setValue={setAlternatePhone}
              fieldValue={alternatePhone}
            />

            <h1
              style={{
                color: "white",
                fontWeight: "bold",
                backgroundColor: "blue",
                width: "100%",
              }}
            >
              Educational Qualifications
            </h1>

            <Input
              fieldName="Madhyamik"
              fieldType="number"
              placeHolder="madhyamik percentage"
              className={6}
              setValue={setMadhyamik}
              fieldValue={madhyamik}
            />

            <Input
              fieldName="HS"
              fieldType="number"
              placeHolder="HS percentage"
              className={6}
              setValue={setHs}
              fieldValue={hs}
            />

            <Input
              fieldName="Graduation"
              fieldType="number"
              placeHolder="Graduation percentage"
              className={6}
              setValue={setGraduation}
              fieldValue={graduation}
            />

            <Input
              fieldName="Post Graduation"
              fieldType="number"
              placeHolder="Post Graduation percentage"
              className={6}
              setValue={setPostGraduation}
              fieldValue={postGraduation}
            />

            <Input
              fieldName="Others"
              fieldType="number"
              placeHolder="Others percentage"
              className={6}
              setValue={setOthers}
              fieldValue={others}
            />

            <h1
              style={{
                color: "white",
                fontWeight: "bold",
                backgroundColor: "blue",
                width: "100%",
              }}
            >
              Nominee Details
            </h1>

            <Input
              fieldName="Nominee Name"
              fieldType="text"
              placeHolder="Nominee Name"
              setValue={setNomineeName}
              fieldValue={nomineeName}
            />

            <Input
              fieldName="Nominee age"
              fieldType="number"
              placeHolder="Nominee age"
              setValue={setNomineeAge}
              fieldValue={nomineeAge}
            />

            <Input
              fieldName="Nominee Relation"
              fieldType="text"
              placeHolder="Nominee Relation"
              setValue={setNomineeRelation}
              fieldValue={nomineeRelation}
            />

            <h1
              style={{
                color: "white",
                fontWeight: "bold",
                backgroundColor: "blue",
                width: "100%",
              }}
            >
              Bank Details
            </h1>

            <Input
              fieldName="Bank Name"
              fieldType="text"
              placeHolder="Bank Name"
              setValue={setBankName}
              fieldValue={bankName}
            />

            <Input
              fieldName="Account No"
              fieldType="number"
              placeHolder="Account No"
              setValue={setAccountNo}
              fieldValue={accountNo}
            />

            <Input
              fieldName="IFSC Code"
              fieldType="text"
              placeHolder="IFSC Code"
              setValue={setIfscCode}
              fieldValue={ifscCode}
            />

            <Input
              fieldName="PAN"
              fieldType="text"
              placeHolder="PAN"
              setValue={setPan}
              fieldValue={pan}
            />

            <MyEditor
              fieldName="Description"
              fieldValue={workExperience}
              setValue={setWorkExperience}
            />
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <Link
          to="/users"
          type="button"
          className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
        >
          Back
        </Link>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
    </motion.form>
  );
};

export default UserForm;
