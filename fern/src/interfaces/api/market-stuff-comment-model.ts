export interface MarketStuffCommentModel {
  id: number;
  user_id: number | null;
  profile_id: number;
  first_name: string;
  last_name: string;
  payload: string;
  created_at: string;
}
