import React, {Fragment} from 'react';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link'
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import IdeasPageBodyIdeaButtons from './IdeasPageBodyIdeaButtons';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import moment from 'moment';
import {stripTags, truncate} from '../../../app/common/util/helpers';
import { deleteIdea } from '../ideaAction';
import { connect } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  profile: {
    width: theme.spacing(6),
    height: theme.spacing(6)
  },
  cardIdeasPage: {
    padding: theme.spacing(3),
  },
  cardUserPage: {
    padding: theme.spacing(2, 1),
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(0),
      paddingRight: theme.spacing(0),
    },
  },

}));

const IdeasPageBodyIdea = ({theme, elevateCard = true, marginY = 2, dividerBottom = false, idea, auth, deleteIdea}) => {
  const classes = useStyles(theme);
  const {title, body, _id, avatar, authorName, user, likes, comments, date} = idea;

  const renderBody = stripTags(truncate(body,200));
  const isLongText = renderBody.substr(renderBody.length - 4, renderBody.length) === "... ";

  return (
    <Fragment>
      <Box my={marginY}>
        <Card className={!elevateCard ? classes.cardUserPage : classes.cardIdeasPage} variant="outlined" elevation={elevateCard ? 1 : 0}>
          <Grid container className={classes.root} spacing={1}>
            <Grid item xs={12} style={{paddingBottom: 0}}>
              <Box style={{display: 'flex', justifyContent: 'space-between'}}>
                <Box component='span'>
                  <Link variant='h6' color="secondary" component={RouterLink} to={`/ideas/${_id}`}>{title}</Link>
                </Box>
                {
                  auth?.user?._id === user &&
                  <Box>
                    <IconButton  component={RouterLink}
                                 to={`/ideas/edit/${_id}`}
                                 aria-label="edit"
                                 color='primary'>
                      <EditIcon fontSize="medium" />
                    </IconButton>

                      <IconButton onClick={() => deleteIdea(_id)} aria-label="delete"
                                  style={{ color: '#ba1818' }}>
                        <DeleteIcon fontSize="medium"/>
                      </IconButton>
                  </Box>
                }
              </Box>
            </Grid>
            <Grid item sm={2.5}>
              <Box mt={0.5}>
                <Link component={RouterLink} to={`/users/${user}`}>
                  <Avatar alt={authorName}
                          src={avatar}/>
                </Link>
              </Box>


            </Grid>
            <Grid item sm={6}>
              <Box mt={0.5}>
                <Link variant='body2' color="secondary" component={RouterLink} to={`/users/${user}`}>{authorName}</Link>
              </Box>
              <Box mt={0.5}>
                <Typography variant="body2" style={{color: '#757575'}}>
                  Written {moment(date).fromNow()}
                </Typography>
              </Box>
            </Grid>
            <Grid item md={12}>
              <Typography variant="body1" paragraph={true}>
                {renderBody}
                {isLongText && <Link variant='body1' component={RouterLink} to={`/ideas/${_id}`}>(more)</Link>}
              </Typography>
              <IdeasPageBodyIdeaButtons likes={likes} comments={comments.length} id={_id}/>
            </Grid>
          </Grid>
        </Card>
      </Box>
      {dividerBottom ? <Divider/> : null}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

const actions = {
  deleteIdea,
};

export default connect(mapStateToProps, actions)(IdeasPageBodyIdea);