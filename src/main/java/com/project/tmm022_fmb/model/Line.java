package com.project.tmm022_fmb.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Column;

@Entity
@Table(name = "HPM_LINE_MASTER")
public class Line {

    @Id
    @Column(name = "LINE_ID")
    private String lineId;

    @Column(name = "LINE_DESC")
    private String lineDesc;

    @Column(name = "UNIT_ID")
    private String unitId;

    @Column(name = "GROUP_ID")
    private String groupId;

    // Getters and Setters
    public String getLineId() {
        return lineId;
    }

    public void setLineId(String lineId) {
        this.lineId = lineId;
    }

    public String getLineDesc() {
        return lineDesc;
    }

    public void setLineDesc(String lineDesc) {
        this.lineDesc = lineDesc;
    }

    public String getUnitId() {
        return unitId;
    }

    public void setUnitId(String unitId) {
        this.unitId = unitId;
    }

    public String getGroupId() {
        return groupId;
    }

    public void setGroupId(String groupId) {
        this.groupId = groupId;
    }
}
