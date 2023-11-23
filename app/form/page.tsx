'use client';
import React, { useState } from 'react';

const initialFormState = {
  name: '',
  email: '',
  interested: 'your message here...',
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

    alert('Form submitted:' + JSON.stringify(formState, null, 2));
    // setIsSubmitted(true);
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
        alert('Data saved successfully!');
        setFormState(initialFormState); // Reset the form state
      } else {
        console.error('Server error:', responseData.error); // Log server error
        alert('Something went wrong! Folks');
      }
    } catch (error) {
      console.error('Error saving data:', error);
      alert('Something went wrong! Folks');
    }
  };

  return (
    <div className="flex justify-center items-center flex-col">
      <h3 className="m-12 text-4xl font-bold">
        Ready to Embark on an Exciting Tech Journey?
      </h3>
      <p className="text-lg text-gray-400 my-12 mx-16">
        Welcome to a community where innovation meets collaboration. We're
        thrilled to learn more about you and why you're eager to join us! Let's
        get started by filling out the form below.
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
          value={formState.name}
          onChange={handleChange}
          className="bg-[#2b2b2b]"
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
          value={formState.email}
          onChange={handleChange}
          className="bg-[#2b2b2b]"
        />

        {/* Interested */}
        <label htmlFor="interested" className="text-3xl">
          Why are you interested?
        </label>
        <textarea
          id="interested"
          name="interested"
          required
          value={formState.interested}
          onChange={handleChange}
          className="bg-[#2b2b2b] text-[white] px-4 py-2"
          wrap="hard"
          rows={5}
          cols={50}
          placeholder="Tell us why you are interested in joining."
        ></textarea>

        {/* GitHub Link */}
        <label htmlFor="githubLink" className="text-3xl">
          GitHub Link
        </label>
        <input
          type="url"
          id="githubLink"
          name="githubLink"
          required
          value={formState.githubLink}
          onChange={handleChange}
          className="bg-[#2b2b2b]"
        />

        {/* Domain */}
        <label className="text-3xl">Domain</label>
        <div className="flex justify-between items-center md:flex-row flex-col ">
          {['App', 'Web', 'Cloud', 'DevOps', 'DSA', 'ML'].map((domain) => (
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
          ))}
        </div>
        <button
          onClick={handleSaveData}
          className="hover:bg-teal-200 bg-black border-teal-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default MyForm;

//
