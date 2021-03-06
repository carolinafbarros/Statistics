package org.iStat.api.iStatTransform.request;

import org.apache.commons.lang3.builder.ToStringBuilder;

import com.fasterxml.jackson.annotation.JsonProperty;

public class RequestiStatTransformCell {

    @JsonProperty(value = "line")
    private Integer line;

    @JsonProperty(value = "column")
    private String column;

    @JsonProperty(value = "value")
    private Float value;

    public RequestiStatTransformCell(){
    }
    
    public RequestiStatTransformCell(Integer line, String column,
            Float value) {
        this.line = line;
        this.column = column;
        this.value = value;
    }

    public Integer getLine() {
        return line;
    }

    public String getColumn() {
        return column;
    }

    public Float getValue() {
        return value;
    }

    @Override
    public String toString() {
        return new ToStringBuilder(this)
            .append("line", line).append("column", column)
            .append("value", value).build();
    }
}
