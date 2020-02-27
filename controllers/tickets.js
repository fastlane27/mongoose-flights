const Ticket = require('../models/ticket');

module.exports = {
    new: newTicket,
    create,
    delete: deleteTicket
}

function newTicket(req, res) {
    res.render('tickets/new', { title: 'Add Ticket', flightId: req.params.id });
}

function create(req, res) {
    req.body.flight = req.params.id;
    Ticket.create(req.body, function(err) {
        res.redirect(`/flights/${req.params.id}`);
    });
}

function deleteTicket(req, res) {
    Ticket.findByIdAndDelete(req.params.id, function(err) {
        res.redirect(`/flights/${req.body.flightId}`);
    });
}
