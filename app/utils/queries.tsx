import { gql } from 'urql';

const FETCH_USERS = gql`
  query {
    users {
      id
      firstName
    }
  }
`;

const FETCH_POLL_BY_ID = gql`
  query PollById($id: String) {
      pollById(id: $id) {
        id,
        title,
        description,
        contestants,
        voters,
        duration,
        type,
        status
      }
    }
`;

const FETCH_POLLS = gql`
  query {
    polls{
      id,
      title,
      description,
      contestants,
      voters,
      duration,
      type,
      status
    }
  }
`;

const VERIFY_EMAIL_TOKEN = gql`
  query VerifyEmailToken($token: String, $type: String!) {
    verifyEmailToken(token: $token, type: $type) {
        email
    }
  }
`;

export {
    FETCH_USERS,
    FETCH_POLL_BY_ID,
    FETCH_POLLS, 
    VERIFY_EMAIL_TOKEN
}