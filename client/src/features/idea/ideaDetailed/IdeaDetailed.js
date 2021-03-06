import React, { Fragment, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import IdeaDetailedSidebarRight from './IdeaDetailedSidebarRight';
import IdeaDetailedBody from './IdeaDetailedBody';
import IdeaDetailedAddComment from './IdeaDetailedAddComment';
import IdeaDetailedComments from './IdeaDetailedComments';
import { getProfileById } from '../../user/profileAction';
import { connect } from 'react-redux';
import Spinner from '../../../app/common/util/Spinner';
import { SORT_COMMENT_BY_DATE, SORT_COMMENT_BY_LIKES } from '../ideaSlice';
import { addComment, getIdea,  } from '../ideaAction';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  card: {
    padding: theme.spacing(5),
    marginBottom: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(3),
    }
  }

}));

const IdeaDetailed = ({ theme, idea, profile, auth: {loading, isAuthenticated, user},
                        getIdea, addComment, match, SORT_COMMENT_BY_DATE,
                        SORT_COMMENT_BY_LIKES
                      }) => {
  const classes = useStyles(theme);

  useEffect(() => {
    getIdea(match.params.id);
  }, [getIdea]);

  const mainDiv =<Fragment>
      <Grid container className={classes.root} spacing={3}>
        <Grid item lg={8} sm={12}>
          <Card className={classes.card}>
            <IdeaDetailedBody idea={idea} isAuthenticated={isAuthenticated} isAuthenticatedUser={isAuthenticated && user?._id === idea?.user}/>
          </Card>
          {isAuthenticated &&
            <Card className={classes.card}>
              <IdeaDetailedAddComment addComment={addComment} idea={idea}/>
            </Card>
          }
          {idea !== null && idea.comments.length > 0 ? (
            <IdeaDetailedComments
              ideaId={idea._id}
            comments={idea.comments}
            sortCommentsByDate={SORT_COMMENT_BY_DATE}
            sortCommentsByLikes={SORT_COMMENT_BY_LIKES}/>) : null}
        </Grid>
        {profile !== null &&
        <Grid item lg={4} sm={12}>
          <Card className={classes.card}>
             <IdeaDetailedSidebarRight profile={profile} isAuthenticated={isAuthenticated}/>
          </Card>
        </Grid>}
      </Grid>
    </Fragment>;

  return loading || idea === null ? <Spinner/> : mainDiv;

};

const mapStateToProps = (state) => ({
  auth: state.auth,
  idea: state.idea.idea,
  profile: state.profile.profile
});

const actions = {
  getIdea,
  addComment,
  getProfileById,
  SORT_COMMENT_BY_DATE,
  SORT_COMMENT_BY_LIKES
};

export default connect(mapStateToProps, actions)(IdeaDetailed);
