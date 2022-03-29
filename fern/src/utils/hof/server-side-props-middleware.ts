import authService from '@Services/common/auth.service';
import { PageProps } from '@Utils/types';
import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { ParsedUrlQuery } from 'querystring';

export function withToken(
  fn: (context: GetServerSidePropsContext<ParsedUrlQuery>) => Promise<GetServerSidePropsResult<PageProps>>,
): GetServerSideProps<PageProps> {
  return function addToken(context: GetServerSidePropsContext<ParsedUrlQuery>) {
    try {
      authService.retrieveAndSaveAuthenticationResult(context.req.cookies);
    } catch (error) {
      // fallback silently
      console.error('token not found');
    }

    return fn(context);
  };
}
