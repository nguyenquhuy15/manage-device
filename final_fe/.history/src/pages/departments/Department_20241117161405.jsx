import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useBoolean from "../../hooks/useBoolean";
import useNotification from "../../hooks/useNotification";
import { Helmet } from "react-helmet-async";
import { Container } from "react-bootstrap";
import DepartmentApi from "../../api/DepartmentApi";
import UserApi from "../../api/UserApi";
import DepartmentTableComponent from "../../components/departments/viewlist/DepartmentTableComponent";
import DepartmentNoDataComponent from "../../components/departments/viewlist/DepartmentNoDataComponent";
import CreateDepartmentModal from "../../components/departments/create/CreateDepartmentModal";
import UpdateDepartmentModal from "../../components/departments/update/UpdateDepartmentModal";
import DeleteDepartmentModal from "../../components/departments/delete/DeleteDepartmentModal";
import ImportAccountModal from "../../components/departments/import/ImportAccountModal";
import * as XLSX from "xlsx";

const DepartmentPage = () => {
  const navigate = useNavigate();
  const [showSuccessMessage, showErrorMessage] = useNotification();

  const [departments, setDepartments] = useState([]);
  // paging
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  // sorting
  const [currentSort, setCurrentSort] = useState({
    sortField: "id",
    isAsc: false,
  });
  // search
  const [currentSearch, setCurrentSearch] = useState("");

  // // filter
  // const [currentFilter, setCurrentFilter] = useState({
  //   minDate: "",
  //   maxDate: "",
  //   minMember: "",
  //   maxMember: "",
  // });
  // // refresh table
  // const [timeRefreshTable, setTimeRefreshTable] = useState(new Date());
  // // create
  // const [
  //   isShowCreateDepartmentModal,
  //   showCreateDepartmentModal,
  //   hideCreateDepartmentModal,
  // ] = useBoolean(false);
  // const [managers, setManagers] = useState([]);
  // const [employees, setEmployees] = useState([]);
  // const [currentSearchEmployee, setCurrentSearchEmployee] = useState("");
  // const [currentSortEmployee, setCurrentSortEmployee] = useState({
  //   sortField: "id",
  //   isAsc: false,
  // });
  // const [addingEmployeeIds, setAddingEmployeeIds] = useState(new Set());
  // const [timeRefreshTableEmployee, setTimeRefreshTableEmployee] = useState(
  //   new Date()
  // );
  // const [timeRefreshCreateForm, setTimeRefreshCreateForm] = useState(
  //   new Date()
  // );
  // const [isShowEmployeeTable, showEmployeeTable, hideEmployeeTable] =
  //   useBoolean(false);
  // // update
  // const [
  //   isShowUpdateDepartmentModal,
  //   showUpdateDepartmentModal,
  //   hideUpdateDepartmentModal,
  // ] = useBoolean(false);
  // const [managersForUpdate, setManagersForUpdate] = useState([]);
  // const [detailDepartmentInfo, setDetailDepartmentInfo] = useState([]);
  // const [timeRefreshUpdateForm, setTimeRefreshUpdateForm] = useState(
  //   new Date()
  // );
  // // delete
  // const [
  //   isShowDeleteDepartmentModal,
  //   showDeleteDepartmentModal,
  //   hideDeleteDepartmentModal,
  // ] = useBoolean(false);
  // const [deletingDepartmentId, setDeletingDepartmentId] = useState();
  // // import
  // const [
  //   isShowImportAccountModal,
  //   showImportAccountModal,
  //   hideImportAccountModal,
  // ] = useBoolean(false);
  // const [timeRefreshImportForm, setTimeRefreshImportForm] = useState(
  //   new Date()
  // );
  // const [departmentsForImport, setDepartmentsForImport] = useState([]);
  // const [accountsForImport, setAccountsForImport] = useState([]);
  // const [
  //   isShowImportAccountTable,
  //   showImportAccountTable,
  //   hideImportAccountTable,
  // ] = useBoolean(false);

  useEffect(() => {
    getListDepartments();
  }, [currentPage, currentSort, currentSearch]);

  // useEffect(() => {
  //   if (isShowCreateDepartmentModal) {
  //     getListEmployees();
  //   }
  // }, [isShowCreateDepartmentModal, currentSearchEmployee, currentSortEmployee]);

  const getListDepartments = async () => {
    const data = await DepartmentApi.getAll({
      page: currentPage,
      sortField: currentSort.sortField,
      isAsc: currentSort.isAsc,
      search: currentSearch,
    });
    setDepartments(data.content);
    setTotalPages(data.totalPages);
  };

  const resetPaging = useCallback(() => setCurrentPage(1), []);

  const resetCurrentSort = useCallback(
    () => setCurrentSort({ sortField: "id", isAsc: false }),
    []
  );

  const resetCurrentSearch = useCallback(() => {
    setCurrentSearch("");
  }, []);

  const isSearchEmpty = () => {
    return !currentSearch || currentSearch.length === 0;
  };

  // const resetCurrentFilter = useCallback(() => {
  //   setCurrentFilter({
  //     minDate: "",
  //     maxDate: "",
  //     minMember: "",
  //     maxMember: "",
  //   });
  // }, []);

  // const isFilterEmpty = () => {
  //   return;
  //   !currentFilter.minDate &&
  //     !currentFilter.maxDate &&
  //     !currentFilter.minMember &&
  //     !currentFilter.maxMember;
  // };

  const onResetTable = useCallback(() => {
    resetPaging();
    resetCurrentSort();
    resetCurrentSearch();
    // resetCurrentFilter();
    setTimeRefreshTable(new Date());
  }, []);

  // const onClickDepartmentItem = useCallback((departmentId) => {
  //   navigate(`/departments/${departmentId}`);
  // }, []);

  // const existsByDepartmentName = useCallback(async (name) => {
  //   return await DepartmentApi.existsByName(name);
  // }, []);

  // const onShowCreateDepartmentModal = () => {
  //   // reset modal
  //   setTimeRefreshCreateForm(new Date());
  //   getListManagers();
  //   hideEmployeeTable();
  //   onResetTableEmployee();
  //   // show modal
  //   showCreateDepartmentModal();
  // };

  // const getListManagers = async () => {
  //   const data = await UserApi.getAllAccountsByNoDepartment();
  //   setManagers(data);
  // };

  // const getListEmployees = async () => {
  //   const data = await UserApi.getAllAccountsByNoDepartment(
  //     currentSearchEmployee,
  //     currentSortEmployee.sortField,
  //     currentSortEmployee.isAsc
  //   );
  //   setEmployees(data);
  // };

  // const onResetTableEmployee = useCallback(() => {
  //   resetCurrentSortEmployee();
  //   resetCurrentSearchEmployee();
  //   setAddingEmployeeIds(new Set());
  //   setTimeRefreshTableEmployee(new Date());
  // }, []);

  // const resetCurrentSearchEmployee = useCallback(() => {
  //   setCurrentSearchEmployee("");
  // }, []);

  // const isEmployeeSearchEmpty = () => {
  //   return !currentSearchEmployee || currentSearchEmployee.length === 0;
  // };

  // const resetCurrentSortEmployee = useCallback(
  //   () => setCurrentSortEmployee({ sortField: "id", isAsc: false }),
  //   []
  // );

  // const onCreateDepartment = useCallback(
  //   async (name, managerId) => {
  //     // call api
  //     await DepartmentApi.create(
  //       name,
  //       managerId,
  //       Array.from(addingEmployeeIds)
  //     );
  //     // show notification
  //     showSuccessMessage("Create Department Successfully!");
  //     // hide modal
  //     hideCreateDepartmentModal();
  //     // reset department table
  //     onResetTable();
  //   },
  //   [addingEmployeeIds]
  // );

  // const onShowUpdateDepartmentModal = async (departmentId) => {
  //   // show modal
  //   showUpdateDepartmentModal();
  //   // reset modal
  //   await getListManagersForUpdate(departmentId);
  //   await getDetailDepartmentInfo(departmentId);
  //   setTimeRefreshUpdateForm(new Date());
  // };

  // const getListManagersForUpdate = async (departmentId) => {
  //   const data = await DepartmentApi.getAllAccountsByDepartment(departmentId);
  //   setManagersForUpdate(data.content);
  // };

  // const getDetailDepartmentInfo = async (departmentId) => {
  //   const data = await DepartmentApi.getDetail(departmentId);
  //   setDetailDepartmentInfo(data);
  // };

  // const onUpdateDepartment = useCallback(
  //   async (departmentId, name, managerId) => {
  //     // call api
  //     await DepartmentApi.update(departmentId, name, managerId);
  //     // show notification
  //     showSuccessMessage("Update Department Successfully!");
  //     // hide modal
  //     hideUpdateDepartmentModal();
  //     // reset department table
  //     onResetTable();
  //   },
  //   []
  // );

  // const onShowDeleteDepartmentModal = useCallback((departmentId) => {
  //   // show modal
  //   showDeleteDepartmentModal();
  //   // save department id
  //   setDeletingDepartmentId(departmentId);
  // }, []);

  // const onDeleteDepartment = useCallback(async () => {
  //   try {
  //     // call api
  //     await DepartmentApi.delete(deletingDepartmentId);
  //     // show notification
  //     showSuccessMessage("Delete Department Successfully!");
  //     // hide modal
  //     hideDeleteDepartmentModal();
  //     // reset department table
  //     onResetTable();
  //   } catch (error) {
  //     if (error.response.status === 400) {
  //       showErrorMessage(
  //         "There are users in the department. You cann't delete this department!"
  //       );
  //     } else {
  //       throw error;
  //     }
  //   }
  // }, [deletingDepartmentId]);


  

  // const onShowImportAccountModal = useCallback(async () => {
  //   // show modal
  //   showImportAccountModal();
  //   // reset modal
  //   await getDepartmentsForImport();
  //   setAccountsForImport([]);
  //   hideImportAccountTable();
  //   setTimeRefreshImportForm(new Date());
  // }, []);

  // const getDepartmentsForImport = async () => {
  //   const data = await DepartmentApi.getAllDepartmentForFilter();
  //   setDepartmentsForImport(data);
  // };

  // const onChangeExcelFile = useCallback(
  //   (event, file, setFieldError, setFieldValue) => {
  //     let reader = new FileReader();

  //     // read file
  //     reader.onload = function (e) {
  //       let workbook = XLSX.read(e.target.result, {
  //         type: "binary",
  //       });

  //       // get first sheet
  //       let firstSheet = workbook.SheetNames[0];
  //       let rows = XLSX.utils.sheet_to_row_object_array(
  //         workbook.Sheets[firstSheet]
  //       );
  //       let jsonArray = JSON.stringify(rows);
  //       jsonArray = JSON.parse(jsonArray);
  //       // format key
  //       renameOfAccountKeys(jsonArray);
  //       // get fullname & id
  //       getMoreAccountInfo(jsonArray, event, setFieldError, setFieldValue);
  //     };

  //     // error
  //     reader.onerror = function (exception) {
  //       console.log(exception);
  //     };

  //     reader.readAsBinaryString(file);
  //   },
  //   []
  // );

  // const renameOfAccountKeys = (jsonArray) => {
  //   jsonArray.forEach((item) => {
  //     delete Object.assign(item, { username: item.Username })["Username"];
  //     delete Object.assign(item, { role: item.Role })["Role"];
  //   });
  // };

  // const getMoreAccountInfo = async (
  //   accounts,
  //   event,
  //   setFieldError,
  //   setFieldValue
  // ) => {
  //   try {
  //     const data = await UserApi.getInfoAccountsByUsernames(
  //       accounts.map((account) => account.username)
  //     );
      
  //     for (const item of data) {
  //       let account = accounts.find(
  //         (account) => account.username == item.username
  //       );
  //       account.id = item.id;
  //       account.fullname = item.fullname;
  //     }
  //     setAccountsForImport(accounts);
  //     showImportAccountTable();
  //   } catch (error) {
  //     setAccountsForImport(accounts);
  //     hideImportAccountTable();
  //     if (error.response.status === 400) {
  //       console.log(error);
  //       setFieldError(
  //         "excelFile",
  //         JSON.stringify(error.response.data.exception)
  //       );
  //       setFieldValue("excelFile", "", false);
  //       event.target.value = null;
  //     } else {
  //       throw error;
  //     }
  //   }
  // };

  // const onImportAccounts = useCallback(
  //   async (departmentId, managerId, employeeIds) => {
  //     // call api
  //     await DepartmentApi.importAccounts(departmentId, managerId, employeeIds);
  //     // show notification
  //     showSuccessMessage("Import Accounts Successfully!");
  //     // hide modal
  //     hideImportAccountModal();
  //     // reset department table
  //     onResetTable();
  //   },
  //   []
  // );

  return (
    <>
      <Helmet title="Department" />
      <Container fluid className="p-0">
        <h1 className="h3 mb-3">Department List</h1>

        {departments.length == 0 && isSearchEmpty() && isFilterEmpty() ? (
          <DepartmentNoDataComponent />
        ) : (
          <DepartmentTableComponent
            // table
            departments={departments}
            // paging
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            resetPaging={resetPaging}
            // sorting
            currentSort={currentSort}
            setCurrentSort={setCurrentSort}
            resetCurrentSort={resetCurrentSort}
            // search
            currentSearch={currentSearch}
            setCurrentSearch={setCurrentSearch}
            // filter
            currentFilter={currentFilter}
            setCurrentFilter={setCurrentFilter}
            // refresh table
            timeRefreshTable={timeRefreshTable}
            onResetTable={onResetTable}
            // onClick
            onClickItem={onClickDepartmentItem}
            onCreate={onShowCreateDepartmentModal}
            onUpdateItem={onShowUpdateDepartmentModal}
            onDeleteItem={onShowDeleteDepartmentModal}
            onImport={onShowImportAccountModal}
          />
        )}

        {isShowCreateDepartmentModal && (
          <CreateDepartmentModal
            hideModal={hideCreateDepartmentModal}
            existsByName={existsByDepartmentName}
            managers={managers}
            isShowTable={isShowEmployeeTable}
            showTable={showEmployeeTable}
            employees={employees}
            // sorting
            currentSort={currentSortEmployee}
            setCurrentSort={setCurrentSortEmployee}
            resetCurrentSort={resetCurrentSortEmployee}
            // search
            currentSearch={currentSearchEmployee}
            setCurrentSearch={setCurrentSearchEmployee}
            isSearchEmpty={isEmployeeSearchEmpty}
            // refresh table
            timeRefreshTable={timeRefreshTableEmployee}
            onResetTable={onResetTableEmployee}
            // checkbox
            addingIds={addingEmployeeIds}
            setAddingIds={setAddingEmployeeIds}
            timeRefreshForm={timeRefreshCreateForm}
            onSubmit={onCreateDepartment}
          />
        )}

        {isShowUpdateDepartmentModal && (
          <UpdateDepartmentModal
            hideModal={hideUpdateDepartmentModal}
            existsByName={existsByDepartmentName}
            managers={managersForUpdate}
            detailInfo={detailDepartmentInfo}
            timeRefreshForm={timeRefreshUpdateForm}
            onSubmit={onUpdateDepartment}
          />
        )}

        {isShowDeleteDepartmentModal && (
          <DeleteDepartmentModal
            hideModal={hideDeleteDepartmentModal}
            name={
              departments.find(
                (department) => department.id === deletingDepartmentId
              ).name
            }
            onSubmit={onDeleteDepartment}
          />
        )}

        {isShowImportAccountModal && (
          <ImportAccountModal
            hideModal={hideImportAccountModal}
            departments={departmentsForImport}
            onChangeExcelFile={onChangeExcelFile}
            accounts={accountsForImport}
            isShowTable={isShowImportAccountTable}
            timeRefreshForm={timeRefreshImportForm}
            onSubmit={onImportAccounts}
          />
        )}
      </Container>
    </>
  );
};

export default DepartmentPage;
