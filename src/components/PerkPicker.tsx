import { useEffect, useState } from "react";
import { IPerk, RoleENUM } from "../types/types";
import PerkSlot from "./PerkSlot";
import axios from "axios";
import { Pagination, PaginationProps } from "antd";
import { apiUrl } from "../apiConfig";

interface PerkPickerProps {
  selectedPerks: (IPerk | undefined)[];
  role: RoleENUM;
  handlePerkSelect: (perk: IPerk) => void;
}

const PerkPicker = (props: PerkPickerProps) => {
  const [masterPerkList, setMasterPerkList] = useState<IPerk[]>();
  const [perkList, setPerkList] = useState<IPerk[]>([]);
  const [contentPos, setContentPos] = useState(0);
  const [pageSize, setPageSize] = useState(15);
  const [page, setPage] = useState(1);

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

  return (
    <div className="h-full w-full p-2">
      <div className="p-2 grid gap-2 grid-cols-4 sm:grid-cols-5 bg-gray-600 rounded-xl">
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
