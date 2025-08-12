import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { bookingsAPI } from '../services/api';
import { Calendar, Clock, MapPin, Ticket, CheckCircle } from 'lucide-react';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    fetchBookings();
  }, [isAuthenticated, navigate]);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const response = await bookingsAPI.getAll();
      setBookings(response.data.reverse()); // Show newest first
    } catch (error) {
      console.error('Error fetching bookings:', error);
      setError('Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
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

  const formatBookingDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const isEventUpcoming = (eventDate) => {
    return new Date(eventDate) > new Date();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your bookings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Bookings</h1>
          <p className="text-gray-600">
            Welcome back, <span className="font-medium">{user?.name}</span>! 
            Here are all your event bookings.
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {/* Bookings List */}
        {bookings.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <Ticket className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No bookings yet
            </h3>
            <p className="text-gray-500 mb-6">
              Start exploring events and book your first ticket!
            </p>
            <button
              onClick={() => navigate('/')}
              className="btn btn-primary"
            >
              Explore Events
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {bookings.map((booking) => (
              <div key={booking.id} className="card p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  {/* Booking Info */}
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <h3 className="text-xl font-bold text-gray-900 mr-3">
                        {booking.eventTitle}
                      </h3>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        {booking.status}
                      </span>
                      {isEventUpcoming(booking.eventDate) && (
                        <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          Upcoming
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      {/* Event Date & Time */}
                      <div className="flex items-center text-gray-600">
                        <Calendar className="w-4 h-4 mr-2 text-primary-600" />
                        <div className="text-sm">
                          <div className="font-medium">{formatDate(booking.eventDate)}</div>
                          <div>{formatTime(booking.eventTime)}</div>
                        </div>
                      </div>

                      {/* Venue */}
                      <div className="flex items-center text-gray-600">
                        <MapPin className="w-4 h-4 mr-2 text-primary-600" />
                        <div className="text-sm">
                          <div className="font-medium truncate">{booking.venue}</div>
                        </div>
                      </div>

                      {/* Ticket Info */}
                      <div className="flex items-center text-gray-600">
                        <Ticket className="w-4 h-4 mr-2 text-primary-600" />
                        <div className="text-sm">
                          <div className="font-medium">
                            {booking.quantity}x {booking.ticketType}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Booking Details */}
                    <div className="text-sm text-gray-500">
                      Booked on {formatBookingDate(booking.bookingDate)} • 
                      Booking ID: <span className="font-mono">{booking.id.slice(0, 8)}</span>
                    </div>
                  </div>

                  {/* Amount */}
                  <div className="mt-4 md:mt-0 md:ml-6 text-right">
                    <div className="text-2xl font-bold text-primary-600">
                      ₹{booking.totalAmount.toLocaleString('en-IN')}
                    </div>
                    <div className="text-sm text-gray-500">
                      Total Amount
                    </div>
                  </div>
                </div>

                {/* Mobile Actions */}
                <div className="mt-4 md:hidden border-t pt-4">
                  <div className="text-center">
                    <div className="inline-block bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-600">
                      Show this at the venue entrance
                    </div>
                  </div>
                </div>

                {/* QR Code Placeholder for Desktop */}
                <div className="hidden md:block mt-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                      Present this booking confirmation at the venue entrance
                    </div>
                    <div className="bg-gray-100 p-2 rounded">
                      <div className="w-12 h-12 bg-gray-200 flex items-center justify-center text-xs text-gray-500">
                        QR Code
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Stats */}
        {bookings.length > 0 && (
          <div className="mt-8 bg-white rounded-xl shadow-card p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Booking Summary</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-600">
                  {bookings.length}
                </div>
                <div className="text-sm text-gray-600">Total Bookings</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {bookings.filter(b => isEventUpcoming(b.eventDate)).length}
                </div>
                <div className="text-sm text-gray-600">Upcoming Events</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  ₹{bookings.reduce((sum, b) => sum + b.totalAmount, 0).toLocaleString('en-IN')}
                </div>
                <div className="text-sm text-gray-600">Total Spent</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;
