import React, { useState, useEffect } from "react";
import _ from "lodash";

import api from "../../../api";

import SearchStatus from "../../ui/searchStatus";
import Pagination from "../../common/pagination";
import GroupList from "../../common/groupList";
import UsersTable from "../../ui/usersTable";
import SearchField from "../../ui/searchField";

import { paginate } from "../../../utils/paginate";
import { useUsers } from "../../../hooks/useUsers";

const UsersListPage = () => {
    // const { users, ...rest } = props;
    const pageSize = 8;

    const { users } = useUsers();

    const [currentPage, setCurrentPage] = useState(1);
    const [filter, setFilter] = useState();
    const [professions, setProfessions] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const [searchStr, setSearchStr] = useState("");
    const [sortBy, setSortBy] = useState({ path: "", order: "" });

    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfessions(data));
        return () => console.log("unmount");
    }, []);

    useEffect(() => setCurrentPage(1), [selectedProf, searchStr]);

    const handleUserRemove = (userId) => {
        // setUsers((prevState) =>
        //     prevState.filter((user) => user._id !== userId)
        // );
        console.log("delete user with id ", userId);
    };

    const handleUserBookmarkToggle = (userId) => {
        // setUsers((prevState) =>
        //     prevState.map((user) => ({
        //         ...user,
        //         bookmark: userId === user._id ? !user.bookmark : user.bookmark,
        //     }))
        // );
        console.log("toggle user bookmark", userId);
    };

    const handleProfessionSelect = (item) => {
        setSelectedProf(item);
        if (item) {
            setFilter({ value: item._id, exact: true, path: "profession._id" });
            setSearchStr("");
        } else {
            setFilter(undefined);
        }
    };

    const handleSearchChange = (value) => {
        setSearchStr(value);
        if (value.length > 0) {
            setFilter({ value, path: "name" });
            setSelectedProf(undefined);
        } else {
            setFilter(undefined);
        }
    };

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const handleSort = (item) => {
        setSortBy(item);
    };

    const clearFilter = () => {
        setSelectedProf(undefined);
        searchStr.length === 0 && setFilter(undefined);
    };

    // if (!users) return "loading...";

    const filterUsers = (user) => {
        const comparedValue = _.get(user, filter.path);
        if (filter.exact) return comparedValue === filter.value;

        const regExp = new RegExp(filter.value, "gi");
        return regExp.test(comparedValue);
    };

    const filteredUsers = filter ? users.filter(filterUsers) : users;

    const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);

    const usersCrop = paginate(sortedUsers, currentPage, pageSize);

    const usersCount = filteredUsers.length;

    const renderUsersTable = () =>
        usersCount > 0 && (
            <UsersTable
                users={usersCrop}
                onSort={handleSort}
                selectedSort={sortBy}
                onDelete={handleUserRemove}
                onBookmarkToggle={handleUserBookmarkToggle}
            />
        );

    return (
        <div className="d-flex">
            {professions && (
                <div className="d-flex flex-column flex-shrink-0 p-3">
                    <GroupList
                        items={professions}
                        onItemSelect={handleProfessionSelect}
                        selectedItem={selectedProf}
                    />
                    <button
                        className="btn btn-secondary mt-2"
                        onClick={clearFilter}
                    >
                        Очистить
                    </button>
                </div>
            )}
            <div className="d-flex flex-column">
                <SearchStatus usersAmount={usersCount} />
                <SearchField onChange={handleSearchChange} value={searchStr} />
                {renderUsersTable()}
                <div className="d-flex justify-content-center">
                    <Pagination
                        itemsCount={usersCount}
                        pageSize={pageSize}
                        onPageChange={handlePageChange}
                        currentPage={currentPage}
                    />
                </div>
            </div>
        </div>
    );
};

export default UsersListPage;
