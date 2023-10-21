import { useEffect, useState } from "react";
import { IKSToggleSelectionType, IPerk, RoleENUM } from "../types/types";
import PerkSlot from "./PerkSlot";
import axios from "axios";
import { Pagination, PaginationProps } from "antd";
import { apiUrl } from "../apiConfig";
import KSToggle from "./KSToggle";
import SearchInput from "./SearchInput";
import { SearchProps } from "antd/es/input";

interface PerkPickerProps {
  selectedPerks: (IPerk | undefined)[];
  role: RoleENUM;
  handlePerkSelect: (perk: IPerk) => void;
  onRoleChange: (role: IKSToggleSelectionType) => void;
}

const PerkPicker = (props: PerkPickerProps) => {
  const [masterPerkList, setMasterPerkList] = useState<IPerk[]>();
  const [perkList, setPerkList] = useState<IPerk[]>([]);
  const [contentPos, setContentPos] = useState(0);
  const [pageSize, setPageSize] = useState(15);
  const [page, setPage] = useState(1);
  const [role, setRole] = useState<IKSToggleSelectionType>();
  const [searchBarValue, setSearchBarValue] = useState<string>();

  useEffect(() => {
    const getPerks = async () => {
      try {
        const response = await axios.get(apiUrl + "perks");

        setMasterPerkList(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    getPerks();
  }, []);

  useEffect(() => {
    if (masterPerkList) {
      const copyPerkList = masterPerkList.filter(
        (perk: IPerk) => perk.role === props.role
      );
      setPerkList(copyPerkList);
    }
  }, [masterPerkList, props.role]);

  useEffect(() => {
    if (masterPerkList) {
      if (searchBarValue == "" || searchBarValue == undefined) {
        const copyPerkList = masterPerkList.filter(
          (perk: IPerk) => perk.role === props.role
        );
        setPerkList(copyPerkList);
      } else {
        const copyPerkList = masterPerkList
          .filter((perk: IPerk) => perk.role === props.role)
          .filter((perk: IPerk) =>
            perk.name
              ?.toLocaleLowerCase()
              .includes(searchBarValue.toLocaleLowerCase())
          );
        setPerkList(copyPerkList);
      }
    }
  }, [searchBarValue]);

  const perkPicked = (slotNumber: number) => {
    props.handlePerkSelect(perkList[slotNumber]);
    return (event: React.MouseEvent) => {
      event.preventDefault;
    };
  };

  const handlePageChange: PaginationProps["onChange"] = (
    newPage,
    newPageSize
  ) => {
    setPage(newPage);
    setPageSize(newPageSize);
    setContentPos(newPageSize * (newPage - 1));
  };

  const handleKSToggle = (selection: IKSToggleSelectionType) => {
    setRole(selection);
    props.onRoleChange(selection);
  };

  const handleSearch: SearchProps["onSearch"] = (value) => {
    console.log(value);
    setSearchBarValue(value);
  };

  return (
    <div className="h-full w-full p-2 bg-gray-700 rounded-xl shadow-lg ">
      <div className="flex place-items-center">
        <div className="p-1 pb-3">
          <KSToggle start={role?.role} onClick={handleKSToggle} />
        </div>

        <div className="flex-grow p-1 pb-3 ">
          <SearchInput
            placeholderText="Search perks..."
            onSearch={handleSearch}
          />
        </div>
      </div>

      <div className="bg-gray-600 rounded-xl flex place-content-center place-items-center">
        {perkList.length == 0 ? (
          <p className="text-gray-400 text-lg">No matching results...</p>
        ) : (
          <div className="p-2 grid gap-2 grid-cols-4 sm:grid-cols-5 ">
            {perkList
              .sort((a, b) => {
                const nameA = a.name || "";
                const nameB = b.name || "";
                return nameA.localeCompare(nameB, undefined, {
                  sensitivity: "base",
                });
              })
              .slice(contentPos, contentPos + pageSize)
              .map((perk, i) => {
                return (
                  <PerkSlot
                    perk={perk}
                    key={i + contentPos}
                    slotNumber={i + contentPos}
                    isSelected={props.selectedPerks.includes(perk)}
                    handleClick={perkPicked}
                    allowHover={false}
                  />
                );
              })}
          </div>
        )}
      </div>

      <div className="flex place-content-center p-2">
        <Pagination
          current={page}
          pageSize={pageSize}
          total={perkList?.length}
          onChange={handlePageChange}
          showSizeChanger={false}
          responsive={true}
        ></Pagination>
      </div>
    </div>
  );
};

export default PerkPicker;
