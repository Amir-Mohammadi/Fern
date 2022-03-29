import { MarketStuffAnswerModel } from './market-stuff-answer-model';

export interface MarketStuffQuestionModel {
  id: number;
  user_id: number | null;
  profile_id: number | null;
  payload: string | null;
  first_name: string | null;
  last_name: string | null;
  answers: Array<MarketStuffAnswerModel> | null;
  created_at: string | null;
  row_version: string;
}
