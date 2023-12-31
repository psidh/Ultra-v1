'use client';
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const initialFormState = {
  name: '',
  email: '',
  interested: '',
  githubLink: 'https://github.com/',
  domain: '',
};

const MyForm: React.FC = () => {
  const [formState, setFormState] = useState(initialFormState);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleDomainChange = (domain: string) => {
    setFormState({
      ...formState,
      domain,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.info('The form is being submitted... Please Wait')
  };

  const handleSaveData = async () => {
    try {
      console.log('Sending data:', formState);

      const response = await fetch('/api/form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formState }), // Send formState directly
      });

      const responseData = await response.json(); // Parse response JSON

      console.log('Response:', response);

      if (response.ok) {
        toast.success('Data saved successfully!', {position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light"});

        setFormState(initialFormState); // Reset the form state
      } else {
        console.error('Server error:', responseData.error); // Log server error
        toast.error('Something went wrong! Please try again.');
      }
    } catch (error) {
      console.error('Error saving data:', error);
      toast.error('Something went wrong! Please try again.');
    }
  };

  return (
    <div>
      <ToastContainer />
      <div className="flex justify-center items-center flex-col">
        <h3 className="m-12 text-4xl font-bold">
          Ready to Embark on an Exciting Tech Journey?
        </h3>
        <p className="text-lg text-gray-400 my-12 mx-16">
          Welcome to a community where innovation meets collaboration. We're
          thrilled to learn more about you and why you're eager to join us!
          Let's get started by filling out the form below.
        </p>
        <form
          onSubmit={handleSubmit}
          className="mb-4 px-12 py-8 bg-[#1c1c1c] rounded-md w-full lg:w-4/5 flex flex-col"
        >
          {/* Name */}
          <label htmlFor="name" className="text-3xl">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            placeholder="Type your name..."
            value={formState.name}
            onChange={handleChange}
            className="bg-[#2b2b2b] py-4 px-6"
          />

          {/* Email */}
          <label htmlFor="email" className="text-3xl">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            placeholder="Type your email ID..."
            value={formState.email}
            onChange={handleChange}
            className="bg-[#2b2b2b] py-4 px-6"
          />

          {/* Interested */}
          <label htmlFor="interested" className="text-3xl">
            Why are you interested? (Include your past experiences)
          </label>
          <textarea
            id="interested"
            name="interested"
            required
            value={formState.interested}
            onChange={handleChange}
            className="bg-[#2b2b2b] text-[white] p-4"
            wrap="hard"
            rows={5}
            cols={50}
            placeholder="Tell us why you are interested in joining the community (This will determine whether you are genuinely interested and enthusiastic )
          You can even add your experiences..."
          ></textarea>

          {/* GitHub Link */}
          <label htmlFor="githubLink" className="text-3xl">
            GitHub Profile (required)
          </label>
          <input
            type="url"
            id="githubLink"
            name="githubLink"
            required
            value={formState.githubLink}
            onChange={handleChange}
            className="bg-[#2b2b2b] py-4 px-6"
          />

          {/* Domain */}
          <label className="text-3xl">Domain</label>
          <div className="flex justify-between items-center md:flex-row flex-col ">
            {['App', 'Web', 'Cloud', 'DevOps', 'DSA', 'ML', 'Blockchain'].map(
              (domain) => (
                <div
                  key={domain}
                  className={`flex justify-between m-1 items-center border w-full border-[#505050] rounded-xl  ${
                    formState.domain === domain
                      ? ' bg-white  text-black '
                      : ' text-white '
                  }`}
                  onClick={() => handleDomainChange(domain)}
                >
                  <input
                    type="radio"
                    id={domain}
                    name="domain"
                    value={domain}
                    checked={formState.domain === domain}
                    onChange={() => ({})}
                    className="bg-[#2b2b2b] ml-6"
                  />
                  <label htmlFor={domain} className="mr-6">
                    {domain}
                  </label>
                </div>
              )
            )}
          </div>
          <button
            onClick={handleSaveData}
            className="hover:bg-teal-200 bg-black border-teal-700"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default MyForm;

//
