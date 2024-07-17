package com.project.tmm022_fmb.service;

import com.project.tmm022_fmb.repository.LineRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class LineService {

    @Autowired
    private LineRepository lineRepository;

    /**
     * Validates the Line ID and Line Description based on the global parameter.
     * 
     * @param lineID The Line ID to validate.
     * @param lineDesc The Line Description to validate.
     * @param unitID The Unit ID associated with the Line.
     * @param groupID The Group ID associated with the Line.
     * @param globalParam The global parameter determining the validation logic.
     * @return true if the Line ID and Line Description are valid, false otherwise.
     */
    public boolean validateLineID(String lineID, String lineDesc, String unitID, String groupID, int globalParam) {
        if (globalParam == 0) {
            return lineRepository.existsInLineMaster(unitID, groupID, lineID, lineDesc);
        } else if (globalParam == 1) {
            return lineRepository.existsInLineAndPartMaster(unitID, groupID, lineID, lineDesc);
        }
        return false;
    }

    /**
     * Handles the logic when the user double-clicks on the Line ID field.
     * 
     * @param globalParam The global parameter determining the behavior.
     * @return A list of values (LOV) for selecting the Line ID.
     */
    public List<String> handleLineIDDoubleClick(int globalParam) {
        if (globalParam == 0) {
            return lineRepository.getLineMasterLOV();
        } else if (globalParam == 1) {
            return lineRepository.getLineAndPartMasterLOV();
        }
        return new ArrayList<>();
    }

    /**
     * Handles the logic when the user clicks on the Line ID field.
     * 
     * @param saveButtonEnabled The current state of the Save button.
     * @param fields The fields to be cleared if not empty.
     * @return The updated state of the Save button and cleared fields.
     */
    public Map<String, Object> handleLineIDClick(boolean saveButtonEnabled, Map<String, String> fields) {
        Map<String, Object> result = new HashMap<>();
        if (saveButtonEnabled) {
            result.put("saveButtonEnabled", false);
        }
        fields.forEach((key, value) -> fields.put(key, ""));
        result.put("fields", fields);
        return result;
    }

    /**
     * Validates the required fields before moving to the next item.
     * 
     * @param unitID The Unit ID to validate.
     * @param unitName The Unit Name to validate.
     * @param groupID The Group ID to validate.
     * @param groupName The Group Name to validate.
     * @param lineID The Line ID to validate.
     * @param lineDesc The Line Description to validate.
     * @return A map containing the validation result and the field to focus on if validation fails.
     */
    public Map<String, Object> validateRequiredFields(String unitID, String unitName, String groupID, String groupName, String lineID, String lineDesc) {
        Map<String, Object> result = new HashMap<>();
        if (unitID.isEmpty()) {
            result.put("valid", false);
            result.put("focusField", "unitID");
            return result;
        }
        if (unitName.isEmpty()) {
            result.put("valid", false);
            result.put("focusField", "unitName");
            return result;
        }
        if (groupID.isEmpty()) {
            result.put("valid", false);
            result.put("focusField", "groupID");
            return result;
        }
        if (groupName.isEmpty()) {
            result.put("valid", false);
            result.put("focusField", "groupName");
            return result;
        }
        if (lineID.isEmpty()) {
            result.put("valid", false);
            result.put("focusField", "lineID");
            return result;
        }
        if (lineDesc.isEmpty()) {
            result.put("valid", false);
            result.put("focusField", "lineDesc");
            return result;
        }
        result.put("valid", true);
        result.put("focusField", "partNumber");
        return result;
    }
}
