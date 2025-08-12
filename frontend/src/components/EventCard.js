import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Calendar, Clock, Users, Tag } from 'lucide-react';

const EventCard = ({ event }) => {
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

  const getLowestPrice = () => {
    return Math.min(...event.ticketTypes.map(ticket => ticket.price));
  };

  return (
    <div className="card overflow-hidden">
      {/* Event Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
            <Tag className="w-3 h-3 mr-1" />
            {event.category}
          </span>
        </div>
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg">
          <span className="text-sm font-semibold text-gray-900">
            ₹{getLowestPrice().toLocaleString('en-IN')} onwards
          </span>
        </div>
      </div>

      {/* Event Content */}
      <div className="p-6">
        {/* Event Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
          {event.title}
        </h3>

        {/* Event Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {event.description}
        </p>

        {/* Event Details */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-600 text-sm">
            <Calendar className="w-4 h-4 mr-2 text-primary-600" />
            <span>{formatDate(event.date)}</span>
            <Clock className="w-4 h-4 ml-4 mr-2 text-primary-600" />
            <span>{formatTime(event.time)}</span>
          </div>
          
          <div className="flex items-center text-gray-600 text-sm">
            <MapPin className="w-4 h-4 mr-2 text-primary-600" />
            <span className="truncate">{event.venue}</span>
          </div>

          <div className="flex items-center text-gray-600 text-sm">
            <Users className="w-4 h-4 mr-2 text-primary-600" />
            <span>{event.availableSeats} seats available</span>
          </div>
        </div>

        {/* Organizer */}
        <div className="text-xs text-gray-500 mb-4">
          Organized by <span className="font-medium">{event.organizer}</span>
        </div>

        {/* Book Now Button */}
        <Link
          to={`/events/${event.id}`}
          className="btn btn-primary w-full justify-center"
        >
          Book Now
        </Link>
      </div>
    </div>
  );
};

export default EventCard;
