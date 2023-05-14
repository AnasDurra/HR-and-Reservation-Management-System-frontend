import { Button, Table } from "antd";
import Spinner from "../../../Components/Spinner/Spinner";
import { connect } from "react-redux";
import { useEffect } from "react";

function ViewJobApplications(props) {

    useEffect(() => {
        // fetch data
    }, []);

    const columns = [
        {
            title: 'الاسم',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'المعرف الشخصي',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'القسم',
            dataIndex: 'department',
            key: 'department',
        },
        {
            title: 'الشاغر الوظيفي',
            dataIndex: 'job',
            key: 'job',
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

    return (
        <Spinner loading={props.loading}>
            <div>
                <Table
                    columns={columns}
                    // dataSource={data}
                    rowKey='id'
                />
                <Button
                    className="jobApplicationsButton"
                    onClick={() => console.log('clicked')}
                >
                    إضافة طلب توظيف
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

export default connect(mapStateToProps, mapDispatchToProps)(ViewJobApplications);