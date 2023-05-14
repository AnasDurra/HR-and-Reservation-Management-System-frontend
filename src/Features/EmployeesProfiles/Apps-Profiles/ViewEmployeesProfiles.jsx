import { Button, Table } from "antd";
import Spinner from "../../../Components/Spinner/Spinner";
import { connect } from "react-redux";
import { useEffect } from "react";

function ViewEmployeesPrfiles(props) {

    useEffect(() => {
        // props.getJobVacancies();
    }, []);

    const columns = [
        {
            title: 'الاسم',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'القسم',
            dataIndex: 'department',
            key: 'department',
        },
        {
            title: 'المسمى الوظيفي',
            dataIndex: 'job',
            key: 'job',
        },
        {
            title: 'حالة الموظف',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'العمليات',
            key: 'actions',
            render: (record) => {
                return (
                    <div id="actions">
                        <Button
                            type='link'
                            onClick={() => {
                                console.log('details');
                            }}
                        >
                            استعراض
                        </Button>
                    </div>
                );
            },
            width: '10%'
        },
    ];

    const data = [
        {
            id: 1,
            name: 'هادي بركات',
            department: 'قسم التدريب',
            job: 'منسق قسم التدريب',
            status: 'يعمل الان',
        }
    ];


    return (
        <Spinner loading={props.loading}>
            <div>
                <Table
                    columns={columns}
                    dataSource={data}
                    rowKey='id'
                />
                <Button
                    className="employeesButton"
                    onClick={() =>console.log('clicked')}
                >
                    إضافة موظف
                </Button>
            </div>
        </Spinner>
    );
}

const mapStateToProps = state => {
    return {
    }
}

const mapDispatchToProps = dispatch => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewEmployeesPrfiles);