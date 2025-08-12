import React from 'react';
import { Calendar, Users, Shield, Star, Target, Heart, Award, Globe } from 'lucide-react';

const About = () => {
  const features = [
    {
      icon: Calendar,
      title: 'Easy Booking',
      description: 'Book tickets for your favorite events in just a few clicks with our intuitive interface.'
    },
    {
      icon: Shield,
      title: 'Secure Payments',
      description: 'Your payment information is protected with industry-standard security measures.'
    },
    {
      icon: Users,
      title: 'Verified Events',
      description: 'All events are verified by our team to ensure authenticity and quality.'
    },
    {
      icon: Star,
      title: '24/7 Support',
      description: 'Our customer support team is available round the clock to help you.'
    }
  ];

  const stats = [
    { number: '1M+', label: 'Happy Customers' },
    { number: '50K+', label: 'Events Hosted' },
    { number: '100+', label: 'Cities Covered' },
    { number: '500+', label: 'Event Organizers' }
  ];

  const teamMembers = [
    {
      name: 'Raj Sharma',
      role: 'Founder & CEO',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
      description: 'Passionate about connecting people through amazing experiences.'
    },
    {
      name: 'Priya Singh',
      role: 'Head of Operations',
      image: 'https://images.unsplash.com/photo-1494790108755-2616c0763c06?w=400',
      description: 'Ensures smooth operations and exceptional user experience.'
    },
    {
      name: 'Arjun Kumar',
      role: 'Head of Technology',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
      description: 'Builds robust and scalable technology solutions.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">About EventBook</h1>
            <p className="text-xl mb-8 text-primary-100 max-w-3xl mx-auto">
              We're on a mission to connect people with unforgettable experiences through 
              the power of events. From concerts to conferences, we make booking tickets simple and secure.
            </p>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-gray-600 mb-6 text-lg leading-relaxed">
              At EventBook, we believe that life's most memorable moments happen when people come together. 
              Our platform is designed to make it effortless for you to discover, book, and attend the events 
              that matter most to you.
            </p>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <Target className="h-8 w-8 text-primary-600 mr-2" />
                <span className="font-semibold text-gray-900">Innovation</span>
              </div>
              <div className="flex items-center">
                <Heart className="h-8 w-8 text-primary-600 mr-2" />
                <span className="font-semibold text-gray-900">Community</span>
              </div>
              <div className="flex items-center">
                <Award className="h-8 w-8 text-primary-600 mr-2" />
                <span className="font-semibold text-gray-900">Excellence</span>
              </div>
            </div>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600"
              alt="Team collaboration"
              className="rounded-xl shadow-card w-full"
            />
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-card">
              <div className="flex items-center space-x-2">
                <Globe className="h-6 w-6 text-primary-600" />
                <div>
                  <div className="font-semibold text-gray-900">Pan-India Presence</div>
                  <div className="text-sm text-gray-600">Serving 100+ cities</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Impact</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Numbers that reflect our commitment to connecting people with amazing experiences
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-primary-600 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose EventBook?</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            We've built our platform with you in mind, focusing on simplicity, security, and satisfaction
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="card p-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-100 rounded-lg mb-4">
                <feature.icon className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              The passionate individuals behind EventBook who work tirelessly to bring you the best event experience
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="card p-6 text-center">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-primary-600 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            The principles that guide everything we do at EventBook
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <Users className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Community First</h3>
            <p className="text-gray-600">
              We prioritize building a strong community of event-goers, organizers, and partners who share our passion for memorable experiences.
            </p>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <Shield className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Trust & Security</h3>
            <p className="text-gray-600">
              Your safety and security are paramount. We implement the highest standards of data protection and secure payment processing.
            </p>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
              <Star className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Excellence</h3>
            <p className="text-gray-600">
              We strive for excellence in every interaction, continuously improving our platform and services based on your feedback.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Discover Amazing Events?</h2>
            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              Join millions of event-goers who trust EventBook for their entertainment needs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/" className="btn bg-white text-primary-600 hover:bg-gray-100">
                Explore Events
              </a>
              <a href="/contact" className="btn btn-outline border-white text-white hover:bg-white hover:text-primary-600">
                Get in Touch
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
