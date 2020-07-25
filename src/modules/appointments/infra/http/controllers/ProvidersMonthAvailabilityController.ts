import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderMouthAvailabilityService from '@modules/appointments/services/ListProviderMouthAvailabilityService';

class ProvidersMonthAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params;
    const { month, year } = request.body;

    const listProviders = container.resolve(
      ListProviderMouthAvailabilityService,
    );

    const availability = await listProviders.execute({
      provider_id,
      month,
      year,
    });

    return response.json(availability);
  }
}

export default new ProvidersMonthAvailabilityController();
