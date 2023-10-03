import { createAction, props } from '@ngrx/store';
import { InnerCard } from '../components/inner-card/inner-card.model';

export const customerType = createAction(
  '[Plan Selector Page] Customer Type Selection',
  props<{ customerType: string }>()
);

export const lobType = createAction(
  '[Plan Selector Page] LOB Type Selection',
  props<{ deviceType: string }>()
);

export const generateUserId = createAction(
  '[Plan Selector Page] User Id Generate',
  props<{ userId: string }>()
);

export const planSelection = createAction(
  '[Plan Selector Page] Plan Selection',
  props<{ plan: InnerCard; from: string }>()
);

export const unliSelection = createAction(
  '[Plan Selector Page] Unli Selection',
  props<{
    unli: {
      selectedUnliAppName: string;
      selectedUnliApp: string;
      selectedAppImage: string;
    };
  }>()
);
