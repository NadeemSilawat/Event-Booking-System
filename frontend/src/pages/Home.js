import React, { useState, useEffect } from 'react';
import { Search, Filter, MapPin, Tag } from 'lucide-react';
import EventCard from '../components/EventCard';
import { eventsAPI, filtersAPI } from '../services/api';

const Home = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [cities, setCities] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    city: ''
  });

  useEffect(() => {
    fetchInitialData();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [events, filters]);

  const fetchInitialData = async () => {
    try {
      setLoading(true);
      const [eventsResponse, categoriesResponse, citiesResponse] = await Promise.all([
        eventsAPI.getAll(),
        filtersAPI.getCategories(),
        filtersAPI.getCities()
      ]);

      setEvents(eventsResponse.data);
      setCategories(categoriesResponse.data);
      setCities(citiesResponse.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...events];

    if (filters.search) {
      filtered = filtered.filter(event =>
        event.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        event.description.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    if (filters.category) {
      filtered = filtered.filter(event =>
        event.category.toLowerCase() === filters.category.toLowerCase()
      );
    }

    if (filters.city) {
      filtered = filtered.filter(event =>
        event.city.toLowerCase().includes(filters.city.toLowerCase())
      );
    }

    setFilteredEvents(filtered);
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      category: '',
      city: ''
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading events...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Discover Amazing Events
            </h1>
            <p className="text-xl mb-8 text-primary-100">
              Book tickets for concerts, conferences, and entertainment events across India
            </p>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-card p-6 -mt-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search events..."
                className="form-input pl-10"
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <select
                className="form-select pl-10"
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* City Filter */}
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <select
                className="form-select pl-10"
                value={filters.city}
                onChange={(e) => handleFilterChange('city', e.target.value)}
              >
                <option value="">All Cities</option>
                {cities.map(city => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            {/* Clear Filters */}
            <button
              onClick={clearFilters}
              className="btn btn-secondary flex items-center justify-center"
            >
              <Filter className="h-5 w-5 mr-2" />
              Clear Filters
            </button>
          </div>
        </div>

        {/* Results Count */}
        <div className="mt-6 mb-4">
          <p className="text-gray-600">
            Showing <span className="font-semibold">{filteredEvents.length}</span> events
            {filters.search && (
              <span> for "<span className="font-semibold">{filters.search}</span>"</span>
            )}
          </p>
        </div>

        {/* Events Grid */}
        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <Search className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No events found
            </h3>
            <p className="text-gray-500 mb-4">
              Try adjusting your search criteria or clear the filters
            </p>
            <button
              onClick={clearFilters}
              className="btn btn-primary"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
