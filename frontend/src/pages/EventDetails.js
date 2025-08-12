import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { eventsAPI, bookingsAPI } from '../services/api';
import { MapPin, Calendar, Clock, Users, Tag, ArrowLeft, Minus, Plus } from 'lucide-react';

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchEventDetails();
  }, [id]);

  const fetchEventDetails = async () => {
    try {
      setLoading(true);
      const response = await eventsAPI.getById(id);
      setEvent(response.data);
      if (response.data.ticketTypes.length > 0) {
        setSelectedTicket(response.data.ticketTypes[0].id);
      }
    } catch (error) {
      console.error('Error fetching event details:', error);
      setError('Failed to load event details');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { 
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(':');
    const date = new Date();
    date.setHours(parseInt(hours), parseInt(minutes));
    return date.toLocaleTimeString('en-IN', { 
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const getSelectedTicketDetails = () => {
    return event.ticketTypes.find(ticket => ticket.id === selectedTicket);
  };

  const calculateTotal = () => {
    const ticket = getSelectedTicketDetails();
    return ticket ? ticket.price * quantity : 0;
  };

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    const ticket = getSelectedTicketDetails();
    
    if (newQuantity >= 1 && newQuantity <= Math.min(ticket.available, 10)) {
      setQuantity(newQuantity);
    }
  };

  const handleBooking = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    setBookingLoading(true);
    setError('');
    setSuccess('');

    try {
      const bookingData = {
        eventId: event.id,
        ticketType: selectedTicket,
        quantity: quantity
      };

      const response = await bookingsAPI.create(bookingData);
      setSuccess('Booking confirmed successfully!');
      setShowBookingModal(false);
      
      // Update event data to reflect new availability
      await fetchEventDetails();
      
      // Redirect to bookings page after a short delay
      setTimeout(() => {
        navigate('/bookings');
      }, 2000);
    } catch (error) {
      setError(error.response?.data?.error || 'Booking failed. Please try again.');
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading event details...</p>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Event not found</h2>
          <p className="text-gray-600 mb-4">The event you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/')}
            className="btn btn-primary"
          >
            Back to Events
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <button
          onClick={() => navigate('/')}
          className="flex items-center text-gray-600 hover:text-primary-600 mb-4"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Events
        </button>
      </div>

      {/* Success/Error Messages */}
      {success && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
            {success}
          </div>
        </div>
      )}

      {error && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
            {error}
          </div>
        </div>
      )}

      {/* Event Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Event Image */}
            <div className="card overflow-hidden mb-6">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-64 md:h-96 object-cover"
              />
            </div>

            {/* Event Info */}
            <div className="card p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800 mb-3">
                    <Tag className="w-4 h-4 mr-1" />
                    {event.category}
                  </span>
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                    {event.title}
                  </h1>
                </div>
              </div>

              {/* Event Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center text-gray-600">
                  <Calendar className="w-5 h-5 mr-3 text-primary-600" />
                  <div>
                    <div className="font-medium">{formatDate(event.date)}</div>
                    <div className="text-sm">{formatTime(event.time)}</div>
                  </div>
                </div>
                
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-5 h-5 mr-3 text-primary-600" />
                  <div>
                    <div className="font-medium">{event.venue}</div>
                    <div className="text-sm">{event.city}</div>
                  </div>
                </div>

                <div className="flex items-center text-gray-600">
                  <Users className="w-5 h-5 mr-3 text-primary-600" />
                  <div>
                    <div className="font-medium">{event.availableSeats} seats available</div>
                    <div className="text-sm">out of {event.totalSeats} total</div>
                  </div>
                </div>

                <div className="flex items-center text-gray-600">
                  <div className="w-5 h-5 mr-3" />
                  <div>
                    <div className="font-medium">{event.organizer}</div>
                    <div className="text-sm">Event Organizer</div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-3">About this event</h2>
                <p className="text-gray-600 leading-relaxed">
                  {event.description}
                </p>
              </div>
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="card p-6 sticky top-24">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Book Tickets</h3>
              
              {/* Ticket Selection */}
              <div className="space-y-3 mb-6">
                {event.ticketTypes.map((ticket) => (
                  <div
                    key={ticket.id}
                    className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                      selectedTicket === ticket.id
                        ? 'border-primary-600 bg-primary-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => {
                      setSelectedTicket(ticket.id);
                      setQuantity(1);
                    }}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-semibold text-gray-900">{ticket.name}</div>
                        <div className="text-sm text-gray-600">
                          {ticket.available} available
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-primary-600">
                          ₹{ticket.price.toLocaleString('en-IN')}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quantity Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity
                </label>
                <div className="flex items-center justify-center border border-gray-300 rounded-lg">
                  <button
                    type="button"
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    className="p-3 text-gray-600 hover:text-primary-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="px-4 py-3 font-semibold text-gray-900 min-w-[3rem] text-center">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= Math.min(getSelectedTicketDetails()?.available || 0, 10)}
                    className="p-3 text-gray-600 hover:text-primary-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Total */}
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Amount:</span>
                  <span className="text-2xl font-bold text-primary-600">
                    ₹{calculateTotal().toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Book Button */}
              <button
                onClick={() => setShowBookingModal(true)}
                disabled={!getSelectedTicketDetails()?.available || bookingLoading}
                className="btn btn-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {bookingLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Processing...
                  </div>
                ) : !isAuthenticated ? (
                  'Login to Book'
                ) : (
                  'Book Now'
                )}
              </button>

              {!isAuthenticated && (
                <p className="text-center text-sm text-gray-500 mt-2">
                  You need to login to book tickets
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Booking Confirmation Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Confirm Booking</h3>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Event:</span>
                <span className="font-medium">{event.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Ticket Type:</span>
                <span className="font-medium">{getSelectedTicketDetails()?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Quantity:</span>
                <span className="font-medium">{quantity}</span>
              </div>
              <div className="flex justify-between text-lg font-bold border-t pt-3">
                <span>Total Amount:</span>
                <span className="text-primary-600">₹{calculateTotal().toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowBookingModal(false)}
                className="btn btn-secondary flex-1 justify-center"
              >
                Cancel
              </button>
              <button
                onClick={handleBooking}
                disabled={bookingLoading}
                className="btn btn-primary flex-1 justify-center disabled:opacity-50"
              >
                {bookingLoading ? 'Processing...' : 'Confirm Booking'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventDetails;
