import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useBoolean from "../../hooks/useBoolean";
import useNotification from "../../hooks/useNotification";
import { Helmet } from "react-helmet-async";
import { Container } from "react-bootstrap";
import TypeApi from "../../api/TypeApi";

import TypeTableComponent from "../../components/types/viewlist/TypeTableComponent";
import TypeNoDataComponent from "../../components/types/viewlist/TypeNoDataComponent";
import CreateTypeModal from "../../components/types/create/CreateTypeModal";

const TypePage = () => {
  const navigate = useNavigate();
  const [showSuccessMessage, showErrorMessage] = useNotification();

  const [types, setTypes] = useState([]);
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

  // refresh table
  const [timeRefreshTable, setTimeRefreshTable] = useState(new Date());
  // create
  const [
    isShowCreateTypeModal,
    showCreateTypeModal,
    hideCreateTypeModal,
  ] = useBoolean(false);

  const [timeRefreshCreateForm, setTimeRefreshCreateForm] = useState(
    new Date()
  );



  useEffect(() => {
    getListTypes();
  }, [currentPage, currentSort, currentSearch]);

    const existsByTypeName = useCallback(async (name) => {
      return await TypeApi.existsByName(name);
    }, []);
  
      const existsByTypeCode = useCallback(async (code) => {
        return await TypeApi.existsByCode(code);
      }, []);


  const getListTypes = async () => {
    const data = await TypeApi.getAll({
      page: currentPage,
      sortField: currentSort.sortField,
      isAsc: currentSort.isAsc,
      search: currentSearch,
    });
    setTypes(data.content);
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

  const onResetTable = useCallback(() => {
    resetPaging();
    resetCurrentSort();
    resetCurrentSearch();
    // resetCurrentFilter();
    setTimeRefreshTable(new Date());
  }, []);


  const onShowCreateTypeModal = () => {
    // reset modal
    setTimeRefreshCreateForm(new Date());

    // show modal
    showCreateTypeModal();
  };


  const onCreateType = useCallback(
    async (name, code) => {
      // call api
      await TypeApi.create(name, code);
      // show notification
      showSuccessMessage("Tạo loại thiết bị thành công!");
      // hide modal
      hideCreateTypeModal();
      // reset department table
      onResetTable();
    },
    []
  );
  

  return (
    <>
      <Helmet title="Loại" />
      <Container fluid className="p-0">
        <h1 className="h3 mb-3">Thống kê loại thiết bị</h1>

        {types.length == 0 && isSearchEmpty() ? (
          <TypeNoDataComponent />
        ) : (
          <TypeTableComponent
            // table
            types={types}
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
            // currentFilter={currentFilter}
            // setCurrentFilter={setCurrentFilter}
            // refresh table
            timeRefreshTable={timeRefreshTable}
            onResetTable={onResetTable}
            // onClick
            // onClickItem={onClickDepartmentItem}
            onCreate={onShowCreateTypeModal}
            // onUpdateItem={onShowUpdateDepartmentModal}
            // onDeleteItem={onShowDeleteDepartmentModal}
            // onImport={onShowImportAccountModal}
          />
        )}

        {isShowCreateTypeModal && (
          <CreateTypeModal
            hideModal={hideCreateTypeModal}
            existsByName={existsByTypeName}
            existsByCode={existsByTypeCode}
            timeRefreshForm={timeRefreshCreateForm}
            onSubmit={onCreateType}
          />
        )}
      </Container>
    </>
  );
};

export default TypePage;
