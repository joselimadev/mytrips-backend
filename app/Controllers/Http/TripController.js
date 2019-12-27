/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Trip = use('App/Models/Trip');

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

/**
 * Resourceful controller for interacting with trips
 */
class TripController {
  /**
   * Create/save a new trip.
   * POST trips
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {Auth} ctx.auth
   */

  async index({ auth, response }) {
    try {
      const trips = await Trip.query()
        .where('user_id', auth.current.user.id)
        .fetch();

      return response.status(200).json({
        status: 'success',
        data: trips,
      });
    } catch (error) {
      return response.status(400).json({
        status: 'error',
        message:
          'There was a problem responding the trip, please try again later.',
      });
    }
  }

  async store({ request, response }) {
    const tripData = request.only([
      'user_id',
      'destination_name',
      'destination_city',
      'destination_state',
      'description',
      'photo_reference',
      'lat',
      'lng',
    ]);

    const trip = await Trip.create(tripData);

    return response.status(201).json({
      status: 'success',
      data: { ...trip.toJSON() },
    });
  }
}

module.exports = TripController;
