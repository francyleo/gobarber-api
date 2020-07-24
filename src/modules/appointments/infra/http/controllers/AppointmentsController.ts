import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

import { parseISO } from 'date-fns';

class AppointmentsController {
  public async index(request: Request, response: Response): Promise<Response> {
    // const appointments = await appointmentsRepository.find();
    // return response.json(appointments);

    return response.send();
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { provider_id, date } = request.body;

    const parsedDate = parseISO(date);

    const createAppointment = container.resolve(CreateAppointmentService);

    const appointment = await createAppointment.execute({
      provider_id,
      date: parsedDate,
    });

    return response.status(201).json(appointment);
  }
}

export default new AppointmentsController();
