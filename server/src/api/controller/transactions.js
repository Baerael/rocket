export const transfer = async (req,  res) => {
    const { students } = req.body
    let total = 0;
    for( const student of students ) {
    student.total = student.transactions.reduce( ( a, b ) => a + b, 0 );
    total += student.total;
    }

    for( const student of students ) {
    student.owes = total / students.length - student.total;
    student.pays = [];
    student.gets = [];
    }

    for( const student_a of students ) {
        if( student_a.owes <= 0 )
            continue;
        for( const student_b of students ) {
            if( student_b.owes > 0 )
            continue;
            let pay = Math.min( student_a.owes, -student_b.owes );
            student_a.owes -= pay;
            student_a.pays.push( { to: student_b.name, amount: pay } );
            student_b.owes += pay;
            student_b.gets.push( { from: student_a.name, amount: pay } );
        }
    }

    res.status(200).send(students)
}
