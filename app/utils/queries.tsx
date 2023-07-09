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
        durationS,
        type,
        status, 
        token,
        votes,
        resultSet{
            id,
            popularVote,
            rankRaiseBar
        },
        voted,
        createdAt,
      }
    }
`;

const FETCH_POLLS = gql`
  query Polls($search: String){
    polls(
        filter: {
            or: [
                {token: {icontains: $search}}
                {title: {icontains: $search}}
                {description: {icontains: $search}}
            ]
        }
        ){
      pageInfo {
        startCursor
        endCursor
        hasNextPage
        hasPreviousPage
        }
        edges {
        cursor
        node {
          id,
          title,
          description,
          contestants,
          type,
          status, 
          token,
          duration,
          durationS,
          createdAt
        }
        }
    }
  }
`;

const FETCH_PUBLIC_POLLS = gql`
  query PublicPolls($search: String){
    publicPolls(
        filter: {
            or: [
                {token: {icontains: $search}}
                {title: {icontains: $search}}
                {description: {icontains: $search}}
            ]
        }
        ){
      pageInfo {
        startCursor
        endCursor
        hasNextPage
        hasPreviousPage
        }
        edges {
        cursor
        node {
          id,
          title,
          description,
          contestants,
          type,
          status, 
          token,
          duration,
          durationS,
          createdAt
        }
        }
    }
  }
`;

const VERIFY_EMAIL_TOKEN = gql`
  query VerifyEmailToken($token: String, $type: String!) {
    verifyEmailToken(token: $token, type: $type) {
        isReturning,
        rawToken,
        email,
        name
    }
  }
`;

const FETCH_RANK_POLL = gql`
  query FetchRankPoll($token: String) {
      fetchRankPoll(token: $token) {
          id,
          title,
          description,
          contestants,
          voters,
          duration,
          type,
          status,
          token
      }
    }
`;


const POLL_RESULT = gql`
  query PollResult($token: String) {
      pollResult(token: $token) {
          id,
          popularVote
      }
    }
`;

const POLL_STATUS = gql`
  query PollStatus($token: String) {
    pollStatus(token: $token) {
        isValid,
        pollStatus,
        isLoggedIn,
        email,
        title,
        name,
    }
  }
`;

const VOTER_STATUS = gql`
  query VoterStatus($token: String) {
    voterStatus(token: $token) {
      voted,
      isValid,
      pollStatus
      token, 
      title,
      isLoggedIn,
      name,
      email
    }
  }
`;

export {
    FETCH_USERS,
    FETCH_POLL_BY_ID,
    FETCH_POLLS, 
    VERIFY_EMAIL_TOKEN,
    FETCH_RANK_POLL,
    POLL_RESULT,
    POLL_STATUS,
    VOTER_STATUS,
    FETCH_PUBLIC_POLLS
}