package org.iStat.api.iDomain.makeit;

import static com.google.common.collect.Lists.newArrayList;

import java.util.List;

import org.iStat.api.iDomain.Dataset;
import org.iStat.api.iDomain.DocumentiStat;
import org.iStat.api.iDomain.DocumentiStat.DocumentiStatBuilder;

import com.natpryce.makeiteasy.Instantiator;
import com.natpryce.makeiteasy.Property;
import com.natpryce.makeiteasy.PropertyLookup;

public class DocumentiStatMakeIt {

	public static final Property<DocumentiStat, List<Dataset>> datasets = Property.newProperty();

	public static final Property<DocumentiStat, String> id = Property.newProperty();

	public static final Property<DocumentiStat, Float> scalar = Property.newProperty();

	public static final Instantiator<DocumentiStat> _documentiStat = new Instantiator<DocumentiStat>() {

        @Override
        public DocumentiStat instantiate(PropertyLookup<DocumentiStat> lookup) {

            return new DocumentiStatBuilder()
            		.withDatasets(lookup.valueOf(datasets, newArrayList()))
            		.withId(lookup.valueOf(id, "documentDefault"))
            		.build();

        }
    };
}
