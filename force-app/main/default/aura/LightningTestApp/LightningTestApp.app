<aura:application extends="force:slds">
    <c:ContactList/>
    <c:paginator onprev="{!c.handlePrev}" onnext="{!c.handleNext}"/>
</aura:application>