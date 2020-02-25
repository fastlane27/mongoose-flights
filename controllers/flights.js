const Flight = require('../models/flight');

module.exports = {
    index,
    new: newFlight,
    show,
    create
};

function index(req, res) {
    Flight.find({}, function(err, flights) {
        flights.sort((a, b) => a.departs.getTime() - b.departs.getTime());
        res.render('flights/index', { title: 'All Flights', flights });
    });
}

function newFlight(req, res) {
    const newFlight = new Flight();
    const date = newFlight.departs;
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hour = date.getHours().toString().padStart(2, '0');
    const minute = date.getMinutes().toString().padStart(2, '0');
    const defaultDate = `${year}-${month}-${day}T${hour}:${minute}`;
    
    res.render('flights/new', { title: 'Add Flight', defaultDate });
}

function show(req, res) {
    Flight.findById(req.params.id, function(err, flight) {
        flight.destinations.sort((a, b) => a.arrival.getTime() - b.arrival.getTime());
        res.render('flights/show', { title: 'Flight Details', flight });
    });
}

function create(req, res) {
    for (let key in req.body) {
        if (req.body[key] === '') delete req.body[key];
    }
    const flight = new Flight(req.body);
    flight.save(function(err) {
        if (err) return res.render('flights/new');
        res.redirect('/flights');
    });
}
