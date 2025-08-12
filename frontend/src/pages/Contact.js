import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, User, MessageSquare } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState({
    submitting: false,
    submitted: false,
    error: null
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus({ submitting: true, submitted: false, error: null });

    // Simulate API call
    setTimeout(() => {
      // For demonstration, we'll just check if all fields are filled
      if (formData.name && formData.email && formData.subject && formData.message) {
        setFormStatus({ submitting: false, submitted: true, error: null });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setFormStatus({
          submitting: false,
          submitted: false,
          error: 'Please fill in all fields before submitting.'
        });
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
            <p className="text-xl mb-8 text-primary-100 max-w-3xl mx-auto">
              We're here to help! Whether you have a question about an event, a booking, 
              or anything else, our team is ready to answer all your questions.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Info and Form */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Get in Touch</h2>
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-100 rounded-lg">
                  <Mail className="h-6 w-6 text-primary-600" />
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Email Us</h3>
                <p className="text-gray-600">
                  Send us your questions and we'll get back to you within 24 hours.
                </p>
                <a
                  href="mailto:support@eventbook.com"
                  className="mt-1 text-primary-600 hover:text-primary-700 font-medium"
                >
                  support@eventbook.com
                </a>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-100 rounded-lg">
                  <Phone className="h-6 w-6 text-primary-600" />
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Call Us</h3>
                <p className="text-gray-600">
                  Our team is available from 9 AM to 6 PM IST, Monday to Friday.
                </p>
                <a
                  href="tel:+911234567890"
                  className="mt-1 text-primary-600 hover:text-primary-700 font-medium"
                >
                  +91 12345 67890
                </a>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-100 rounded-lg">
                  <MapPin className="h-6 w-6 text-primary-600" />
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Our Office</h3>
                <p className="text-gray-600">
                  123 Event Street,<br />
                  Tech Park, Bangalore,<br />
                  Karnataka 560001, India
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="card p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <input
                        type="text"
                        name="name"
                        id="name"
                        className="form-input pl-10"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <input
                        type="email"
                        name="email"
                        id="email"
                        className="form-input pl-10"
                        placeholder="Your Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    Subject
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="text"
                      name="subject"
                      id="subject"
                      className="form-input pl-10"
                      placeholder="What is your message about?"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    name="message"
                    id="message"
                    rows="4"
                    className="form-input"
                    placeholder="Write your message here..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Submit Button & Status */}
                <div>
                  {formStatus.submitted && (
                    <div className="bg-green-50 text-green-700 p-3 rounded-lg mb-4 text-center">
                      Thank you! Your message has been sent. We'll get back to you soon.
                    </div>
                  )}
                  {formStatus.error && (
                    <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-center">
                      {formStatus.error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={formStatus.submitting}
                    className="btn btn-primary w-full justify-center disabled:opacity-50"
                  >
                    {formStatus.submitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5 mr-2" />
                        Send Message
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
