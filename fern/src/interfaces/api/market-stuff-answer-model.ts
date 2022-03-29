export interface MarketStuffAnswerModel {
  id: number;
  profile_id: number | null;
  payload: string | null;
  first_name: string | null;
  last_name: string | null;
  created_at: string | null;
  row_version: string;
}
