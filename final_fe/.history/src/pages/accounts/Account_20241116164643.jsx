import React from "react";
import { Helmet } from "react-helmet-async";
import { Card, Container } from "react-bootstrap";
import { appConfig } from "../../config";
import { useNavigate } from "react-router-dom";
import useNotification from "../../hooks/useNotification";
import AccountApi from "../../api/AccountApi";
const AccountPage = () => {
  const navigate = useNavigate();
  const [showSuccessMessage, showErrorMessage] = useNotification();
  const [accounts, setAccounts] = useState([]);
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

    const getListAccounts = async () => {
      const data = await AccountApi.getAll({
        page: currentPage,
        sortField: currentSort.sortField,
        isAsc: currentSort.isAsc,
        search: currentSearch,
      });
      setDevices(data.content);
      setTotalPages(data.totalPages);
    };


  <>
    <Helmet title="Account" />
    <Container fluid className="p-0">
      <h1 className="h3 mb-3">Account Page</h1>

      <Card>
        <Card.Body>
          <h1>Account page content</h1>
          <p>{appConfig.mode}</p>
        </Card.Body>
      </Card>
    </Container>
  </>;
};

export default AccountPage;
