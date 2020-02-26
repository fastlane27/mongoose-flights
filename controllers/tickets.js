const Ticket = require('../models/ticket');

module.exports = {
    new: newTicket,
    create
}

function newTicket(req, res) {
    res.render('tickets/new', { title: 'New Ticket', flightId: req.params.id });
}

function create(req, res) {
    req.body.flight = req.params.id;
    Ticket.create(req.body, function(err) {
        res.redirect(`/flights/${req.params.id}`);
    });
}
