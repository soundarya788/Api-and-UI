import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(3),
  },
  heading: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: theme.spacing(2),
    color: theme.palette.primary.main,
  },
  listItem: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    borderRadius: theme.spacing(1),
    boxShadow: theme.shadows[3],
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'scale(1.02)',
      boxShadow: theme.shadows[8],
    },
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: theme.spacing(1),
    color: theme.palette.primary.main,
  },
  info: {
    fontSize: 14,
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(1),
  },
}));

const ApiIntegration = () => {
  const classes = useStyles();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.gyanibooks.com/library/get_dummy_notes');
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={classes.container}>
      <Typography variant="h1" className={classes.heading}>
          Welcome
      </Typography>
      <Grid container spacing={2}>
        {data.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Paper className={classes.listItem}>
              <ListItem>
                <ListItemText
                  primary={<Typography variant="h2" className={classes.title}>{item.title}</Typography>}
                  secondary={
                    <React.Fragment>
                      <Typography variant="body1" className={classes.info}>ID: {item.id}</Typography>
                      <Typography variant="body1" className={classes.info}>User: {item.user}</Typography>
                      <Typography variant="body1" className={classes.info}>Category: {item.category}</Typography>
                    </React.Fragment>
                  }
                />
              </ListItem>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ApiIntegration;

