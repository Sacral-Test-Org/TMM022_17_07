package com.project.tmm022_fmb.service;

import com.project.tmm022_fmb.repository.PartRepository;
import com.project.tmm022_fmb.repository.LineRepository;
import com.project.tmm022_fmb.model.Part;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PartService {

    @Autowired
    private PartRepository partRepository;

    @Autowired
    private LineRepository lineRepository;

    public String validatePartNumber(String partNumber, int globalParameter, String unitId, String groupId, String lineId, String partId) {
        if (globalParameter == 0) {
            return partRepository.findPartByNumberInEIISPartMaster(unitId, partNumber)
                    .map(part -> "Part number is valid.")
                    .orElse("Part number does not exist in EIIS_PART_MASTER for the given UNIT_ID.");
        } else if (globalParameter == 1) {
            return partRepository.findPartByNumberInHPMPartMaster(unitId, groupId, lineId, partId, partNumber)
                    .map(part -> "Part number is valid.")
                    .orElse("Part number does not exist in HPM_PART_MASTER for the given UNIT_ID, GROUP_ID, LINE_ID, and PART_ID.");
        }
        return "Invalid global parameter.";
    }

    public List<String> getGroupLOV() {
        return partRepository.findGroupLOV();
    }

    public List<String> getEditGroupLOV() {
        return partRepository.findEditGroupLOV();
    }

    public String validateGroupId(String groupId, String groupName, int globalParameter, String unitId) {
        if (globalParameter == 0) {
            return partRepository.validateGroupIdInMESGroupMaster(unitId, groupId, groupName)
                    .map(group -> "Group ID is valid.")
                    .orElse("Group ID and Group Name do not exist in MES_GROUP_MASTER for the given UNIT_ID.");
        } else if (globalParameter == 1) {
            return partRepository.validateGroupIdInMESAndHPMGroupMaster(unitId, groupId, groupName)
                    .map(group -> "Group ID is valid.")
                    .orElse("Group ID and Group Name do not exist in MES_GROUP_MASTER and HPM_PART_MASTER for the given UNIT_ID.");
        }
        return "Invalid global parameter.";
    }

    public String validateUnitID(String unitId, String unitName, int globalParameter) {
        if (globalParameter == 0) {
            return partRepository.findUnitInMESUnitMaster(unitId, unitName)
                    .map(unit -> "Unit ID is valid.")
                    .orElse("Unit ID and Unit Name do not exist in MES_UNIT_MASTER.");
        } else if (globalParameter == 1) {
            return partRepository.findUnitInMESAndHPMPartMaster(unitId, unitName)
                    .map(unit -> "Unit ID is valid.")
                    .orElse("Unit ID and Unit Name do not exist in MES_UNIT_MASTER and HPM_PART_MASTER.");
        }
        return "Invalid global parameter.";
    }

    public String validateLineID(String lineId, String lineDesc, String unitId, String groupId, int globalParameter) {
        if (globalParameter == 0) {
            return lineRepository.validateLineInHPMLineMaster(unitId, groupId, lineId, lineDesc)
                    .map(line -> "Line ID is valid.")
                    .orElse("Line ID and Line Description do not exist in HPM_LINE_MASTER for the given UNIT_ID and GROUP_ID.");
        } else if (globalParameter == 1) {
            return lineRepository.validateLineInHPMLineAndPartMaster(unitId, groupId, lineId, lineDesc)
                    .map(line -> "Line ID is valid.")
                    .orElse("Line ID and Line Description do not exist in HPM_LINE_MASTER and HPM_PART_MASTER for the given UNIT_ID and GROUP_ID.");
        }
        return "Invalid global parameter.";
    }

    public String savePart(Part part) {
        boolean partExists = partRepository.checkIfPartExists(part.getUnitId(), part.getGroupId(), part.getLineId(), part.getPartNo());
        if (partExists) {
            return "Part number already exists for the same unit, group, and line.";
        } else {
            partRepository.save(part);
            return "Part details saved successfully.";
        }
    }

    public String updatePart(Part part) {
        partRepository.update(part);
        return "Part details updated successfully.";
    }
}
