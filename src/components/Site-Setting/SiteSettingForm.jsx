import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import Input from "../common/Input";
import { useTheme } from "../../context/ThemeProvider"; // Assuming you have a theme context

const SiteSettingForm = ({ singleData, onSave, id }) => {
  const navigate = useNavigate();
  const [logo, setLogo] = useState("");
  const [logoPreview, setLogoPreview] = useState(null);
  const [supportContact, setSupportContact] = useState("");
  const [supportEmail, setSupportEmail] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [fbLink, setFbLink] = useState("");
  const [instaLink, setInstaLink] = useState("");
  const [twitterLink, setTwitterLink] = useState("");
  const [youtubeLink, setYoutubeLink] = useState("");
  const [linkedinLink, setLinkedinLink] = useState("");
  const [registrationFees, setRegistrationFees] = useState("");

  const { theme } = useTheme(); 

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogo(file);
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    if (singleData) {
      setLogo(singleData.logo);
      setSupportContact(singleData.supportContact);
      setSupportEmail(singleData.supportEmail);
      setWhatsappNumber(singleData.whatsappNumber);
      setFbLink(singleData.fbLink);
      setInstaLink(singleData.instaLink);
      setTwitterLink(singleData.twitterLink);
      setYoutubeLink(singleData.youtubeLink);
      setLinkedinLink(singleData.linkedinLink);
      setRegistrationFees(singleData.registrationFees);
    }
  }, [singleData]);

  const formData = new FormData();
  if (logo) formData.append("logo", logo);
  formData.append("id", id);
  formData.append("supportContact", supportContact);
  formData.append("supportEmail", supportEmail);
  formData.append("whatsappNumber", whatsappNumber);
  formData.append("fbLink", fbLink);
  formData.append("instaLink", instaLink);
  formData.append("twitterLink", twitterLink);
  formData.append("youtubeLink", youtubeLink);
  formData.append("linkedinLink", linkedinLink);
  formData.append("registrationFees", registrationFees);

  const handleSubmit = (e) => {
    try {
      e.preventDefault();
      onSave(formData, {
        onSuccess: () => {
          toast.success("Site setting updated successfully.");
          navigate("/site-setting");
        },
        onError: () => {
          toast.error("Failed to save site setting. Please try again.");
        },
      });
    } catch (error) {
      toast.error("Failed to save site setting. Please try again.");
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
            <div className={`sm:col-span-3`}>
              <label
                className={`block text-sm font-medium leading-6 ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}
              >
                Logo
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="file"
                    name="logo"
                    className={`flex h-9 w-full rounded-md border ${
                      theme === "dark" ? "border-gray-600" : "border-gray-300"
                    } bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50`}
                    onChange={handleFileChange}
                  />
                </div>
              </div>
            </div>

            {logoPreview ? (
              <img
                src={logoPreview}
                alt="Logo Preview"
                className="mt-4 w-32 h-32 object-cover rounded-md"
              />
            ) : (
              <img
                src={singleData?.logo}
                alt="Logo Preview"
                className="mt-4 w-32 h-32 object-cover rounded-md"
              />
            )}

            <Input
              fieldName="Support Contact"
              fieldValue={supportContact}
              setValue={setSupportContact}
              fieldType="text"
              placeHolder="Support Contact"
              theme={theme}
            />

            <Input
              fieldName="Support Email"
              fieldValue={supportEmail}
              setValue={setSupportEmail}
              fieldType="text"
              placeHolder="Support Email"
              theme={theme}
            />

            <Input
              fieldName="Whatsapp Number"
              fieldValue={whatsappNumber}
              setValue={setWhatsappNumber}
              fieldType="text"
              placeHolder="Whatsapp Number"
              theme={theme}
            />

            <Input
              fieldName="Facebook Link"
              fieldValue={fbLink}
              setValue={setFbLink}
              fieldType="text"
              placeHolder="Facebook Link"
              theme={theme}
            />

            <Input
              fieldName="Instagram Link"
              fieldValue={instaLink}
              setValue={setInstaLink}
              fieldType="text"
              placeHolder="Instagram Link"
              theme={theme}
            />

            <Input
              fieldName="Twitter Link"
              fieldValue={twitterLink}
              setValue={setTwitterLink}
              fieldType="text"
              placeHolder="Twitter Link"
              theme={theme}
            />

            <Input
              fieldName="Youtube Link"
              fieldValue={youtubeLink}
              setValue={setYoutubeLink}
              fieldType="text"
              placeHolder="Youtube Link"
              theme={theme}
            />

            <Input
              fieldName="Linkedin Link"
              fieldValue={linkedinLink}
              setValue={setLinkedinLink}
              fieldType="text"
              placeHolder="Linkedin Link"
              theme={theme}
            />

            <Input
              fieldName="Registration Fees"
              fieldValue={registrationFees}
              setValue={setRegistrationFees}
              fieldType="text"
              placeHolder="Registration Fees"
              theme={theme}
            />
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <Link
          to="/site-setting"
          type="button"
          className={`rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm ${
            theme === "dark"
              ? "bg-red-600 hover:bg-red-500 focus-visible:outline-red-600"
              : "bg-red-600 hover:bg-red-500 focus-visible:outline-red-600"
          }`}
        >
          Back
        </Link>
        <button
          type="submit"
          className={`rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm ${
            theme === "dark"
              ? "bg-indigo-600 hover:bg-indigo-500 focus-visible:outline-indigo-600"
              : "bg-indigo-600 hover:bg-indigo-500 focus-visible:outline-indigo-600"
          }`}
        >
          Save
        </button>
      </div>
    </motion.form>
  );
};

export default SiteSettingForm;
