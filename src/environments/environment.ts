// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
    production: false,
    api_url: 'http://brijerpapi.quickgst.in',
    get_Otp_path: '/api/Account/GetCredentials',
    report_path: '/api/DealerReports/GetDealerList',
    login_path: '/Auth/token',
    get_emp_list:'/api/DealerReports/GetEmployeeList',
    get_dealer_ord_list:'/api/DealerReports/GetDealerOrderList',
    get_emp_ord_list:'/api/DealerReports/GetEmployeeOrderList',
    get_dashboard_figure:'/api//Dashboard/DashboardPortalFigures?user_id=',
    get_portal_list:'/api//Dashboard/GetPortalList?user_id=',
    date_filter:'api/Dashboard/DateFilter?user_id=1',
    get_total_emp:'/api/DealerReports/GetDashboardPortalTotalEmployees',
    get_total_dealer:'/api/DealerReports/GetDashboardPortalTotalDealers',
    get_total_portal:'/api/DealerReports/GetDashboardPortalTotalPortal',
    get_order_by_emp:'/api/DealerReports/GetDashboardPortalOrderPlaceByEmployees',
    get_order_by_dealer:'/api/DealerReports/GetDashboardPortalOrderPlaceByDealers',
    get_date_filter:'/api//Dashboard/DateFilter?user_id=',
    update_date_filter:'/api/Dashboard/UpdateDateFilter',
    total_order_recived_by_dealer:'/api/DealerReports/GetDashboardPortalDealerOrders',
    total_order_recived_by_emp:'/api/DealerReports/GetDashboardPortalEmpOrders',
    total_order_qnty:'/api/DealerReports/GetDashboardPortalTotalOrderQty',
    total_order_amount:'/api/DealerReports/GetDashboardPortalTotalOrderAmount',
    total_order_dispatch:'/api/DealerReports/GetDashboardPortalTotalOrderDispatch',
    order_dispatch_ontime:'/api/DealerReports/GetDashboardPortalTotalOrderOnTime',
    delayed_order:'/api/DealerReports/GetDashboardPortalTotalOrderDelay',
    total_order_pending:'/api/DealerReports/GetDashboardPortalTotalOrderPending',
    cancel_order:'/api/DealerReports/GetDashboardPortalTotalOrderCancel',
    check_auth:'/api/Account/checkAuth',
    get_graph_data:'/api/DashboardGraph/DashboardChartData?user_id=',
    get_pending_orders:'/api/DealerReports/GetDashboardPendingOrdersAll',
    get_pendingOrder_details:'/api/OrderApproval/orderApprovalGetPaymentDetails',
    get_pendingDispatch_order:'/api/DealerReports/GetDashboardOrdersPendingDispatch',
    get_cancel_order:'/api/DealerReports/GetDashboardOrdersCancel',
    login_auth_path: '/users/user.json'
};

