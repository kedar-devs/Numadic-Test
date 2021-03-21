import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import axios from "axios";
import Drawer from '@material-ui/core/Drawer';
import BubbleChartIcon from "@material-ui/icons/BubbleChart"
import List from '@material-ui/core/List';

import ListItem from '@material-ui/core/ListItem';

import "./App.css";

const countriesURL = "https://restcountries.eu/rest/v2/all";

const useStyles = makeStyles((theme) => ({
  table: {
    // minWidth: 650,
    "& .MuiTableCell-root": {
      [theme.breakpoints.down("sm")]: {
        padding: "10px",
      },
    },
    [theme.breakpoints.down("sm")]: {
      "& td": {
        fontSize: 8,
      },
      "& th": {
        fontSize: 8,
      },
    },
  },
  listDisplayer: {
    display: "flex",
    alignItems: "center",
    padding: "0 10px",
    borderBottom: "1px solid whitesmoke",
    "& h2": {
      marginLeft: 5,
      fontSize: 13,
    },
  },
}));

function App() {
  const [countriesData, setCountriesData] = useState([]);
  const [state, setState] = React.useState(false);
  const [DrawerData,setDrawerData] = useState({});
  const classes = useStyles();

  const getCountriesWithAxios = async () => {
    const response = await axios.get(countriesURL);
    console.log(response.data)
    setCountriesData(response.data);
    setCountriesData(response.data);
  };

  useEffect(() => {
    getCountriesWithAxios();
  }, []);
  

  const toggleDrawer =(country,open) => {
     setState(open);
     console.log(open)
     setDrawerData(country)
    // setDrawerData(country)
    console.log(country)
    console.log(DrawerData)
  };
  const list = () => (
    
    <div
      
      role="presentation"
      onClick={()=>toggleDrawer([], false)}
      onKeyDown={()=>toggleDrawer([], false)}
    >
      
      <List>

        
            
            <>
            <ListItem className={classes.listDisplayer}>
    
            <h2>Flag:</h2><br/>
            <img src={DrawerData.flag} alt="" width="32px" />
            </ListItem>
            <ListItem className={classes.listDisplayer}>
              <BubbleChartIcon/>
            <h2>Name:</h2>
            <h2>{DrawerData.name}</h2>
            </ListItem>
            <ListItem className={classes.listDisplayer}>
            <BubbleChartIcon/>
              <h2>Capital:</h2>
              <h2>{DrawerData.capital}</h2>
            </ListItem>
            <ListItem className={classes.listDisplayer}>
            <BubbleChartIcon/>
              <h2>Population:</h2>
              <h2>{DrawerData.population}</h2>
            </ListItem>
            <ListItem className={classes.listDisplayer}>
            <BubbleChartIcon/>
              <h2>Region:</h2>
              <h2>{DrawerData.region}</h2>
            </ListItem>
            <ListItem className={classes.listDisplayer}>
            <BubbleChartIcon/>
              <h2>Sub-Region:</h2>
              <h2>{DrawerData.subregion}</h2>
            </ListItem>
            <ListItem className={classes.listDisplayer}>
            <BubbleChartIcon/>
              <h2>Native Name:</h2>
              <h2>{DrawerData.nativeName}</h2>
            </ListItem>
            <ListItem className={classes.listDisplayer}>
            <BubbleChartIcon/>
              <h2>Code:</h2>
              <h2>{DrawerData.alpha2Code}</h2>
            </ListItem>

            </>

        
      </List>
      
    </div>
  );
  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <strong>Name</strong>
                  </TableCell>
                  <TableCell align="right">
                    <strong>Flag</strong>
                  </TableCell>
                  <TableCell align="right">
                    <strong>Capital</strong>
                  </TableCell>
                  <TableCell align="right">
                    <strong>Population</strong>
                  </TableCell>
                  <TableCell align="right">
                    <strong>Region</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {countriesData.map((country) => (
                  <TableRow>
                    <TableCell component="th" scope="row" onClick={()=>toggleDrawer(country,true)}>
                      {country.name}
                    </TableCell>
                    <TableCell align="right">
                      <img src={country.flag} alt="" width="32px" />
                    </TableCell>
                    <TableCell align="right">{country.capital}</TableCell>
                    <TableCell align="right">{country.population}</TableCell>
                    <TableCell align="right">{country.region}</TableCell>
                  </TableRow>
                ))}
                
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        
      </Grid>
      <Drawer open={state} anchor="right" onClose={()=>toggleDrawer([], false)}>
                  {list()}
                  {/* <h1>
                  paper
                  </h1> */}
                </Drawer>
    </>
  );
}

export default App;
