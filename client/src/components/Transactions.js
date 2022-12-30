import { useState, Fragment } from 'react';
import { Add, Remove } from '@mui/icons-material';
import { 
  Card, Box, Button, ButtonGroup, TextField, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow
} from '@mui/material';
import Paper from '@mui/material/Paper';
import { getAverage }from "../api/transactions.js";

export default function BasicTextFields() {
  const [average, setAverage] = useState([])
  const [students, setStudent] = useState([{
        name: "Adriana",
        transactions: [5.75, 35.00, 12.79]
    },
    {
        name: "Bao",
        transactions: [12.00, 15.00, 23.23]
    },
    {
        name: "Camden",
        transactions: [10.00, 20.00, 38.41, 45.00]
    }]
  )


  const setTransaction = (event, i, j) => {
    const { value } = event.target
    const tempStudents = Object.assign([], students);
    tempStudents[i].transactions[j] = parseFloat(value)
    setStudent(tempStudents)
  }


  const setStudentName = (event, i) => {
    const tempStudents = Object.assign([], students);
    tempStudents[i].name = event.target.value
    setStudent(tempStudents)
  }


  const addTransaction = (i) => {
    const tempStudents = Object.assign([], students);
    tempStudents[i].transactions.push(0) 
    setStudent(tempStudents)
  }


  const removeTransaction = (i) => {
    const tempStudents = Object.assign([], students);
    tempStudents[i].transactions.pop() 
    setStudent(tempStudents)
  }


  const addStudent = (student) => {
    setStudent([...students, {name: "", transactions: [0]}])
  }


  const removeStudent = (student) => {
    students.pop()
    setStudent([...students])
  }

  const calculate = async () => {
    setAverage([])
    const res = await getAverage(students)

    setAverage(res.data)
  }


  const transactionList = students.map((student, i) => (
    <div key={`student-${i}`} >
      <Button 
        disabled={student.transactions.length >= 4}
        sx={{ m: 2, }}
        variant='outlined' 
        onClick={() => addTransaction(i)}
      >
        <Add />
      </Button>
      <Button 
        disabled={student.transactions.length <= 0}
        sx={{ m: 2, margin: 0 }}
        variant='outlined' 
        onClick={() => removeTransaction(i)}
      >
        <Remove />
      </Button>
      <TextField 
        sx={{  m: 1, width: '20ch' }}
        id="outlined-basic-1" 
        placeholder='student-name'
        label={student.name}
        variant="outlined" 
        onChange={(e) => setStudentName(e, i)}
      />
      { student.transactions.map((transaction, j) => (
          <Fragment key={`${i}${j}`}>
              <TextField 
                sx={{  m: 1, width: '12ch'}}
                type="number" 
                step="0.1" 
                id="outlined-basic" 
                placeholder='transaction' 
                label={`${transaction}$`} 
                variant="outlined" 
                onChange={(e) => setTransaction(e, i, j)}
            />
          </Fragment>
        ))
      }
    </div>
  ))


  return (
    <div style={{ width: '100%', display: "flex", justifyContent: "center" }}>
      <div style={{ display: "flex", flexDirection: "column"  }}>
        <Card sx={{ display: "flex", m: 2, p: 2, width: 800, justifyContent: "center" }} elevation={4}>
          <ButtonGroup
            disableElevation
            variant="contained"
            aria-label="Disabled elevation buttons"
          >
            <Button onClick={calculate} >Calculate Transactions</Button>
            <Button onClick={addStudent}>Add Student</Button>
            <Button onClick={removeStudent}>Remove Student</Button>
          </ButtonGroup>
        </Card>

        <Card
        elevation={4}
          component="form"
          sx={{ width: 800, m: 2, p: 2, display: 'flex', flexDirection: 'column', }}
        >
          <Stack spacing={2} sx={{display: 'flex'}}>
            { transactionList }
          </Stack>
        </Card>
        <Box>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell align="right">Total</TableCell>
                  <TableCell align="center">Pays</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {average.map((row, i) => (
                  <TableRow
                    key={`${average.name}-${i}`}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell align="left">{row.name}</TableCell>
                    <TableCell align="right">{`$${row.total.toFixed(2)}`}</TableCell>
                    <TableCell align="center">
                      {row.pays.map((r, i) => (
                        <div key={`c-${i}`}>{`${r.amount.toFixed(2)} to ${r.to}`}</div>
                      ))}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </div>
    </div>
  );
}
